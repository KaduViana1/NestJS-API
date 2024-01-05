import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateGameDto } from './dto/update-game.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create')
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
  //   return this.gameService.update(+id, updateGameDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }
}
