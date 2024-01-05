import { PipeTransform, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';

@Injectable()
export class TransformDatePipe implements PipeTransform {
  transform(game: Game) {
    const releaseDate = new Date(game.releaseDate).toISOString();
    const transformedDateGame = { ...game, releaseDate };
    return transformedDateGame;
  }
}
