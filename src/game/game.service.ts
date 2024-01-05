import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    try {
      const newGame = await this.prisma.game.create({
        data: { ...createGameDto },
      });

      return newGame;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async findAll(): Promise<Game[]> {
    const games = await this.prisma.game.findMany();
    return games;
  }

  async findOne(id: string): Promise<Game> {
    try {
      const game = await this.prisma.game.findUnique({
        where: {
          id,
        },
        include: { reviews: true },
      });
      if (!game) throw new NotFoundException('Jogo não encontrado');
      return game;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.prisma.game.update({
      where: { id },
      data: {
        ...updateGameDto,
      },
    });

    return game;
  }

  async remove(id: string) {
    try {
      await this.prisma.game.delete({ where: { id } });
      return `Game deleted`;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
