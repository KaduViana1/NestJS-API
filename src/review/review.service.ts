import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    userId: string,
    gameId: string,
    createReviewDto: CreateReviewDto,
  ) {
    try {
      const newReview = await this.prisma.review.create({
        data: {
          userId,
          gameId,
          review: createReviewDto.review,
        },
      });

      return newReview;
    } catch (error) {
      if (error.code === 'P2002')
        throw new ForbiddenException(
          'Cada usuario pode fazer apenas um review',
        );
      throw new ForbiddenException(error);
    }
  }

  async findByGameName(game: string) {
    try {
      const gameName = game.replaceAll('-', ' ');

      const reviews = await this.prisma.game.findMany({
        where: {
          name: { contains: gameName },
        },
        select: { reviews: true },
      });

      return reviews;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    userId: string,
    gameId: string,
    createReviewDto: CreateReviewDto,
  ) {
    try {
      const review = await this.prisma.review.update({
        data: { review: createReviewDto.review },
        where: { userId_gameId: { userId, gameId } },
      });
      return review;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async remove(userId: string, gameId: string) {
    try {
      await this.prisma.review.delete({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });
      return `Review Deleted`;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
