import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: 'DATA',
          useValue: [
            { id: 1, url: 'image1.jpg', title: 'Image 1' },
            { id: 2, url: 'image2.jpg', title: 'Image 2' },
          ],
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new image', () => {
    const createImageDto: CreateImageDto = {
      id: 3,
      url: 'newimage.jpg',
      title: 'New Image',
    };

    const result = service.create(createImageDto);

    expect(result.id).toBeDefined();
    expect(result.url).toEqual(createImageDto.url);
    expect(result.title).toEqual(createImageDto.title);
  });

  it('should return all images', async () => {
    const result = await service.findAll();

    expect(result).toHaveLength(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
  });

  it('should return an image by ID', () => {
    const id = 1;

    const result = service.findOne(id) as Image;

    expect(result.id).toEqual(id);
  });

  it('should return an empty object if image not found', () => {
    const id = 100;

    const result = service.findOne(id);

    expect(result).toEqual({});
  });

  it('should update an existing image', () => {
    const id = 1;
    const updateImageDto: UpdateImageDto = {
      title: 'Updated Image',
    };

    const result = service.update(id, updateImageDto);

    expect(result.id).toEqual(id);
    expect(result.title).toEqual(updateImageDto.title);
  });

  it('should remove an existing image', () => {
    const id = 1;

    const result = service.remove(id) as Image;

    expect(result.id).toEqual(id);
  });
});
