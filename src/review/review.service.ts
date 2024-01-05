import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: string) {
    return `This action removes a #${id} review`;
  }
}
