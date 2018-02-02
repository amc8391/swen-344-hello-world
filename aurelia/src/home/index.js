export class Index {
  constructor() {
    this.title = '';
    this.messages = [];
    fetch('http://localhost/api.php?page=home')
    .then((response) => {
      response.json()
        .then((responseData) => {
          this.title = responseData.title;
          this.messages = responseData.messages;
          console.log(this.title);
          console.log(this.messages);
        });
    });
  }
}
