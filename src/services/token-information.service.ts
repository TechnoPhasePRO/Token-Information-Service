import { Injectable, Logger } from '@nestjs/common';
import { AccessGrpcService } from 'src/grpc/access.grpc.service';
import { AccessKeyResponseDto } from 'src/dto/access-key.dto';
import { KeyValidationException, RateLimitExceededException } from 'src/dto/exceptions';

@Injectable()
export class TokenInformationService {
  private readonly staticData = {
    token: 'token_data_1',
    expiresAt: '2024-04-10T12:59:59Z',
    otherDetails: 'static_data'
  };

  private readonly rateLimits = new Map<string, number>();
  private readonly logger = new Logger(TokenInformationService.name);

  constructor(private readonly accessGrpcService: AccessGrpcService) {}

  async getTokenInformation(key: string) {
    try {
      const details: AccessKeyResponseDto = await this.accessGrpcService.validateKey(key);
      const expirationDate = new Date(details.expiration); // Validating expiration key
      const currentDate = Date.now();
      if (expirationDate.getTime() < currentDate) {
        this.logger.error(`Invalid access key: ${key}`);
        throw new KeyValidationException('Invalid access key');
      }      
      let rateLimit = this.rateLimits.get(key); // Checking rate limit
      if (rateLimit === undefined) {
        rateLimit = details.rateLimit;
        this.rateLimits.set(key, rateLimit);
      }

      if (rateLimit <= 0) {
        this.logger.error(`Rate limit exceeded for key: ${key}`);
        throw new RateLimitExceededException('Rate limit exceeded');
      }

      this.rateLimits.set(key, rateLimit - 1); // Decrementing rate limit
      this.logger.log(`Request for token information for key ${key} received at ${new Date()}`);

      return this.staticData;
    } catch (error) {
      throw error;
    }
  }
}
