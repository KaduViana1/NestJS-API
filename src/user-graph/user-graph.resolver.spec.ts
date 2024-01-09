import { Test, TestingModule } from '@nestjs/testing';
import { UserGraphResolver } from './user-graph.resolver';
import { UserGraphService } from './user-graph.service';

describe('UserGraphResolver', () => {
  let resolver: UserGraphResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGraphResolver, UserGraphService],
    }).compile();

    resolver = module.get<UserGraphResolver>(UserGraphResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
