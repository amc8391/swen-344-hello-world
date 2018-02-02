import apiconnector from './apiconnector';

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
    this.links = [];
    apiconnector.getPage('nav')
    .then((responseData) => {
      this.navLinks = responseData.links;
      console.log(responseData);
    });
  }

}
