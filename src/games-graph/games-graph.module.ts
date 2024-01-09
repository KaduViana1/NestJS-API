import { Module } from '@nestjs/common';
import { GamesGraphService } from './games-graph.service';
import { GamesGraphResolver } from './games-graph.resolver';

@Module({
  providers: [GamesGraphResolver, GamesGraphService],
})
export class GamesGraphModule {}
