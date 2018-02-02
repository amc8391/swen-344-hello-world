const apiEndpoint = 'http://www.se.rit.edu/~amc8391/api.php';

export default {
  getPage: (pageName) => {
    return fetch(`${apiEndpoint}?page=${pageName}`).then(response => response.json());
  },
};
