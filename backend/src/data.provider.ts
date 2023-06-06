import { Provider } from '@nestjs/common';
import { ImageI } from './images/image.interface';
import axios from 'axios';

export const DataProvider: Provider = {
  provide: 'DATA',
  useFactory: async () => {
    const urls = [
      'https://my-json-server.typicode.com/icedrone/json-demo-server/photos',
      'https://my-json-server.typicode.com/icedrone/json-demo-server/images',
    ];

    try {
      const requests = urls.map((url) => axios.get<ImageI[][]>(url));

      const data = (await axios.all(requests))
        .map((data) => data.data)
        .flat(Infinity) as ImageI[];

      const images = data.map((image) => ({
        id: Number(String(image.albumId) + String(image.id)),
        title: image.title,
        url: 'url' in image ? image.url : image.path,
      }));

      return images;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
