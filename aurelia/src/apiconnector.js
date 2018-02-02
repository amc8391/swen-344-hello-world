import environment from './environment';

export default {
  getPage: (pageName) => {
    return fetch(environment.apiEndpoint + '?page=' + pageName).then(response => response.json());
  }
};
