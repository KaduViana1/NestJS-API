import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserGraphService } from './user-graph.service';
import { User } from './entities/user-graph.entity';
import { CreateUserGraphInput } from './dto/create-user-graph.input';
import { UpdateUserGraphInput } from './dto/update-user-graph.input';
import { Game } from 'src/games-graph/entities/games-graph.entity';

@Resolver(() => User)
export class UserGraphResolver {
  constructor(private readonly userGraphService: UserGraphService) {}

  @Mutation(() => User)
  createUserGraph(
    @Args('createUserGraphInput') createUserGraphInput: CreateUserGraphInput,
  ) {
    return this.userGraphService.create(createUserGraphInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userGraphService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userGraphService.findOne(id);
  }

  @ResolveField(() => [Game], { name: 'games' })
  async findUsers(@Parent() parent: User) {
    return this.userGraphService.findGames(parent.id);
  }

  @Mutation(() => User)
  updateUserGraph(
    @Args('updateUserGraphInput') updateUserGraphInput: UpdateUserGraphInput,
  ) {
    return this.userGraphService.update(
      updateUserGraphInput.id,
      updateUserGraphInput,
    );
  }

  @Mutation(() => User)
  removeUserGraph(@Args('id') id: string) {
    return this.userGraphService.remove(id);
  }
}
