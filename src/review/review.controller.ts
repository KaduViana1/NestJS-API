import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtGuard)
  @Post('create/:gameId')
  create(
    @GetUser('id') userId: string,
    @Param('gameId') gameId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(userId, gameId, createReviewDto);
  }

  @Get(':game')
  findReviewsByGame(@Param('game') game: string) {
    return this.reviewService.findByGameName(game);
  }

  @UseGuards(JwtGuard)
  @Patch(':gameId')
  update(
    @Param('gameId') gameId: string,
    @GetUser('id') userId: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.update(userId, gameId, updateReviewDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':gameId')
  remove(@Param('gameId') gameId: string, @GetUser('id') userId: string) {
    return this.reviewService.remove(userId, gameId);
  }
}
