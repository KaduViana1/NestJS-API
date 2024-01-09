import { Test, TestingModule } from '@nestjs/testing';
import { UserGraphService } from './user-graph.service';

describe('UserGraphService', () => {
  let service: UserGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGraphService],
    }).compile();

    service = module.get<UserGraphService>(UserGraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
