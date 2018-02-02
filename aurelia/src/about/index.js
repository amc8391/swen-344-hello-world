export class Index {
  constructor() {
    this.title = '';
    this.messages = [];
    this.images = [];
    fetch('http://localhost/api.php?page=about')
    .then((response) => {
      response.json()
        .then((responseData) => {
          this.title = responseData.title;
          this.messages = responseData.messages;
          this.images = responseData.images;
        });
    });
  }
}
