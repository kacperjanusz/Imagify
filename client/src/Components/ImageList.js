import { debounceTime, filter, map } from 'rxjs/operators';

import ImageService from '../Api/ImageService.js';
import store from '../Store.js';

class ImageList extends HTMLElement {
  constructor() {
    super();
    this.images = [];
    this.imageService = new ImageService();
  }

  connectedCallback() {
    this.render();

    this.searchTextInputSubscription = store.searchTextInput
      .pipe(
        map((e) => e.target.value),
        debounceTime(500),
        filter((text) => text.length > 2),
      )
      .subscribe((text) => {
        this.refreshImages(text);
      });
  }

  async refreshImages(searchText = '') {
    this.images = await this.imageService.getImages(searchText);
    this.render();
  }

  createImageList() {
    const tab2 = this.images.slice(0, 10);
    return tab2.map((image) => this.createImage(image.mediumImage, image.bigImage)).join('');
  }

  createImage(url, bigUrl) {
    return `<app-image source=${url} data-big-image=${bigUrl}></app-image>`;
  }

  render() {
    this.innerHTML = this.createImageList();
  }
  disconnectedCallback() {
    this.searchTextInputSubscription.unsubscribe();
  }
}
export default ImageList;
