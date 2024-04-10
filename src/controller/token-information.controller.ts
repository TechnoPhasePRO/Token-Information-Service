import { Controller, Get, Param, Logger } from '@nestjs/common';
import { KeyValidationException, RateLimitExceededException } from 'src/dto/exceptions';
import { TokenInformationService } from 'src/services/token-information.service';

@Controller('token-information')
export class TokenInformationController {
  private readonly logger = new Logger(TokenInformationController.name);

  constructor(private readonly tokenInformationService: TokenInformationService) {}

  @Get('data/:key')
  async getTokenInformation(@Param('key') key: string) {
    try {
      const tokenInformation = await this.tokenInformationService.getTokenInformation(key);
      this.logger.log(`Token information fetched for key: ${key}`);
      return tokenInformation;
    } catch (error) {
      this.logger.error(`Error for key: ${key}, error: ${error.message}`);
      switch (error.constructor) {
        case KeyValidationException:
          return { error: error.message };
        case RateLimitExceededException:
          return { error: error.message };
        default:
          return { error: 'Internal server error' };
      }
    }
  }
}
