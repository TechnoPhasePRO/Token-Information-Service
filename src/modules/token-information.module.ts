import { Module } from '@nestjs/common';
import {ClientsModule,Transport} from '@nestjs/microservices';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { TokenInformationController } from 'src/controller/token-information.controller';
import { AccessGrpcService } from 'src/grpc/access.grpc.service';
import { TokenInformationService } from 'src/services/token-information.service';
import { resolve } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
      name: 'AcessKey',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService)=>{
        const GRPC_HOST =configService.get<string>('ACCESS_KEY_HOST');
        return{
          transport: Transport.GRPC,
          options: {
            package: 'access',
            protoPath: resolve(__dirname, '../proto/access.service.proto'),
            url: GRPC_HOST
          }
        }
      }
    }
    ])
  ],
  controllers: [TokenInformationController],
  providers: [AccessGrpcService,TokenInformationService]
})
export class TokenInformationModule {}
