import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviews(userId: string) {
    try {
      const reviews = await this.prisma.review.findMany({ where: { userId } });

      if (!reviews)
        throw new NotFoundException('Você ainda não fez nenhum review');
      return reviews;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async addGame(userId, gameId) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        games: { connect: { id: gameId } },
      },
      include: { games: true },
    });
  }

  async updateUser(userId, dto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });

    delete user.password;
    return user;
  }

  async deleteUser(id): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return 'User not found';
    else {
      await this.prisma.user.delete({ where: { id } });

      return `User with id ${id} successfully deleted`;
    }
  }
}
