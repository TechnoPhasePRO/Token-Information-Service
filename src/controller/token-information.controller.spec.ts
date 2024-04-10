import { Test, TestingModule } from '@nestjs/testing';
import { TokenInformationController } from './token-information.controller';

describe('TokenInformationController', () => {
  let controller: TokenInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenInformationController],
    }).compile();

    controller = module.get<TokenInformationController>(TokenInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
