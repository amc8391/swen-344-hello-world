import apiconnector from '../apiconnector';

export class Index {
  constructor() {
    this.title = '';
    this.messages = [];
    this.images = [];
    apiconnector.getPage('about')
    .then((responseData) => {
      this.title = responseData.title;
      this.messages = responseData.messages;
      this.images = responseData.images;
    });
  }
}
