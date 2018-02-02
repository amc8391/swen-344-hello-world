import apiconnector from '../apiconnector';

export class Index {
  constructor() {
    this.title = '';
    this.messages = [];
    apiconnector.getPage('home')
    .then((responseData) => {
      this.title = responseData.title;
      this.messages = responseData.messages;
    });
  }
}
