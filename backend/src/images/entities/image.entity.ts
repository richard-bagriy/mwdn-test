export class Image {
  id: number;
  title: string;
  url: string;

  constructor({ id, title, url }: Image) {
    this.id = id;
    this.title = title;
    this.url = url;
  }
}
