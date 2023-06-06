import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { DataProvider } from 'src/data.provider';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [ImagesService, DataProvider],
})
export class ImagesModule {}
