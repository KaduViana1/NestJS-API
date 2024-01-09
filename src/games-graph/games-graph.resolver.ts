import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GamesGraphService } from './games-graph.service';
import { Game } from './entities/games-graph.entity';
import { CreateGamesGraphInput } from './dto/create-games-graph.input';
import { UpdateGamesGraphInput } from './dto/update-games-graph.input';
import { User } from 'src/user-graph/entities/user-graph.entity';

@Resolver(() => Game)
export class GamesGraphResolver {
  constructor(private readonly gamesGraphService: GamesGraphService) {}

  @Mutation(() => Game)
  createGamesGraph(
    @Args('createGamesGraphInput') createGamesGraphInput: CreateGamesGraphInput,
  ) {
    return this.gamesGraphService.create(createGamesGraphInput);
  }

  @Query(() => [Game], { name: 'allGames' })
  findAll() {
    return this.gamesGraphService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id') id: string) {
    return this.gamesGraphService.findOne(id);
  }

  @ResolveField(() => [User], { name: 'users' })
  async findUsers(@Parent() parent: Game) {
    return this.gamesGraphService.findUsers(parent.id);
  }

  @Mutation(() => Game)
  updateGamesGraph(
    @Args('updateGamesGraphInput') updateGamesGraphInput: UpdateGamesGraphInput,
  ) {
    return this.gamesGraphService.update(
      updateGamesGraphInput.id,
      updateGamesGraphInput,
    );
  }

  @Mutation(() => Game)
  removeGamesGraph(@Args('id') id: string) {
    return this.gamesGraphService.remove(id);
  }
}
