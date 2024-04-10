import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { AccessKeyResponseDto } from 'src/dto/access-key.dto';

interface AccessKeyServiceClient {
  accessKeyDetails(data: { key: string }): Observable<AccessKeyResponseDto>;
}

@Injectable()
export class AccessGrpcService implements OnModuleInit {
  private accessKeyServiceClient: AccessKeyServiceClient;

  constructor(@Inject('AcessKey') private client: ClientGrpc) {}

  onModuleInit() {
    this.accessKeyServiceClient = this.client.getService<AccessKeyServiceClient>('AccessKeyService');
  }

  async validateKey(key: string): Promise<AccessKeyResponseDto | null> {
    try {
      const response = await this.accessKeyServiceClient.accessKeyDetails({ key }).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching access key details:', error);
      return null;
    }
  }
}
