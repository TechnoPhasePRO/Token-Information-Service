import { Module } from '@nestjs/common';
import { TokenInformationModule } from './modules/token-information.module';

@Module({
  imports: [TokenInformationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
