import { Injectable } from '@nestjs/common';
import { CreateGamesGraphInput } from './dto/create-games-graph.input';
import { UpdateGamesGraphInput } from './dto/update-games-graph.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, User } from '@prisma/client';

@Injectable()
export class GamesGraphService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGamesGraphInput: CreateGamesGraphInput): Promise<Game> {
    return await this.prisma.game.create({
      data: { ...createGamesGraphInput },
    });
  }

  async findAll(): Promise<Game[]> {
    return await this.prisma.game.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.game.findUnique({ where: { id } });
  }

  async update(id: string, updateGamesGraphInput: UpdateGamesGraphInput) {
    return await this.prisma.game.update({
      where: { id },
      data: { ...updateGamesGraphInput },
    });
  }

  async remove(id: string) {
    return await this.prisma.game.delete({ where: { id } });
  }

  async findUsers(id: string): Promise<User[]> {
    const { users } = await this.prisma.game.findUnique({
      where: { id },
      select: { users: true },
    });

    return users;
  }
}
