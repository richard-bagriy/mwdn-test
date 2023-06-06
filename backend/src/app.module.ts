import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config';
import { ImagesModule } from './images/images.module';
import { HttpModule } from '@nestjs/axios';
import { ImagesService } from './images/images.service';
import { DataProvider } from './data.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ImagesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpModule, ImagesService, DataProvider],
})
export class AppModule {}
