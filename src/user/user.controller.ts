import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { SignInAndUpdateDto } from 'src/dtos/auth.dto';

@UseGuards(JwtGuard)
@Controller('user/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Get('reviews')
  async getReviews(@GetUser('id') userId: string) {
    return this.userService.getReviews(userId);
  }

  @Patch()
  async updateUser(
    @GetUser('id') userId: string,
    @Body() dto: SignInAndUpdateDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete()
  async deleteUser(@GetUser('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
