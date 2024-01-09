import { Injectable } from '@nestjs/common';
import { CreateUserGraphInput } from './dto/create-user-graph.input';
import { UpdateUserGraphInput } from './dto/update-user-graph.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, User } from '@prisma/client';

@Injectable()
export class UserGraphService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserGraphInput: CreateUserGraphInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: { ...createUserGraphInput },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findGames(id: string): Promise<Game[]> {
    const { games } = await this.prisma.user.findUnique({
      where: { id },
      select: { games: true },
    });

    return games;
  }

  async update(id: string, updateUserGraphInput: UpdateUserGraphInput) {
    return await this.prisma.game.update({
      where: { id },
      data: { ...updateUserGraphInput },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
