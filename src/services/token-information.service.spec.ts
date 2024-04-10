import { Test, TestingModule } from '@nestjs/testing';

describe('AccessKeyService', () => {
  let service: AccessKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessKeyService],
    }).compile();

    service = module.get<AccessKeyService>(AccessKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
