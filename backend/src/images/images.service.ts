import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  private images: Image[] = [];

  constructor(
    @Inject('DATA')
    private readonly data: Array<{ id: number; url: string; title: string }>,
  ) {
    this.images = data.map((img) => new Image(img));
  }

  create(createImageDto: CreateImageDto): Image {
    const newImage = new Image(createImageDto);
    this.images.push(newImage);
    return newImage;
  }

  findAll(): Image[] {
    return this.images;
  }

  findOne(id: number): Image | {} {
    return this.images.find((image) => image.id === id) || {};
  }

  update(id: number, updateImageDto: UpdateImageDto): Image {
    let updated: Image = {} as Image;

    this.images = this.images.map((image) => {
      if (image.id === id) {
        const updatedImage = {
          ...image,
          ...updateImageDto,
        };
        updated = updatedImage;
        return updatedImage;
      }

      return image;
    });

    return updated;
  }

  remove(id: number): Image | {} {
    const deleted = this.images.find((image) => image.id === id) || {};
    this.images = this.images.filter((image) => image.id !== id);
    return deleted;
  }
}
