import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

describe('ImagesController', () => {
  let imagesController: ImagesController;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    imagesController = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('should create an image', () => {
    const createImageDto: CreateImageDto = {
      id: 132,
      title: 'mock',
      url: 'mock',
    };
    jest.spyOn(imagesService, 'create').mockImplementation(
      () =>
        new Image({
          id: 132,
          title: 'mock',
          url: 'mock',
        }),
    );

    const result = imagesController.create(createImageDto);

    expect(imagesService.create).toHaveBeenCalledWith(createImageDto);
    expect(result).toEqual({
      id: 132,
      title: 'mock',
      url: 'mock',
    });
  });

  it('should return an array of images', () => {
    jest.spyOn(imagesService, 'findAll').mockImplementation(() => {
      const image1 = new Image({
        id: 1,
        title: 'mock',
        url: 'mock',
      });

      const image2 = new Image({
        id: 2,
        title: 'mock',
        url: 'mock',
      });

      return [image1, image2];
    });

    const result = imagesController.findAll();

    expect(imagesService.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 1,
        title: 'mock',
        url: 'mock',
      },
      {
        id: 2,
        title: 'mock',
        url: 'mock',
      },
    ]);
  });

  it('should return a single image', () => {
    const id = '1';
    jest.spyOn(imagesService, 'findOne').mockImplementation(
      () =>
        new Image({
          id: 1,
          title: 'mock',
          url: 'mock',
        }),
    );

    const result = imagesController.findOne(id);

    expect(imagesService.findOne).toHaveBeenCalledWith(+id);
    expect(result).toEqual({
      id: 1,
      title: 'mock',
      url: 'mock',
    });
  });

  it('should update an image', () => {
    const id = '1';
    const updateImageDto: UpdateImageDto = {
      title: 'test',
    };
    jest.spyOn(imagesService, 'update').mockImplementation(
      () =>
        new Image({
          id: 1,
          title: 'test',
          url: 'mocl',
        }),
    );

    const result = imagesController.update(id, updateImageDto);

    expect(imagesService.update).toHaveBeenCalledWith(+id, updateImageDto);

    expect(result).toEqual({
      id: 1,
      title: 'test',
      url: 'mocl',
    });
  });

  it('should remove an image', () => {
    const id = '1';
    jest
      .spyOn(imagesService, 'remove')
      .mockImplementation(() => Promise.resolve());

    const result = imagesController.remove(id);

    expect(imagesService.remove).toHaveBeenCalledWith(+id);
    expect(result).resolves.toBeUndefined();
  });
});
