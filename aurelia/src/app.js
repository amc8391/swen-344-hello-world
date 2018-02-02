export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Hello World!';
    config.map([
      { route: '', name: 'home', moduleId: 'home/index', title: 'This is Alex\s cool Hello World app' },
      { route: 'about', name: 'about', moduleId: 'about/index', title: 'About Alex' }
    ]);

    config.mapUnknownRoutes('home');
    this.router = router;
  }
  constructor() {
    console.log('THE NAVBAR HAS LOADED');
    this.links = [];
    fetch('http://localhost/api.php?page=nav')
    .then((response) => {
      response.json()
        .then((responseData) => {
          this.navLinks = responseData.links;
          console.log(this.links);
        });
    });
  }

}
