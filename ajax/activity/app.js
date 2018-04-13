var vm = {
  loadUserInfo: function(filepath) {
    $.get(filepath)
      .always(function(data) {
        var userInfo;
        // This is wrong if name, age, and hometown are 0 or ''
        if (data.name && data.age && data.hometown) {
          userInfo = {
            name: data.name,
            age: data.age,
            hometown: data.hometown
          };
        } else {
          userInfo = {
            name: 'Error',
            age: 'Error',
            hometown: 'Error'
          };
        }
        Object.keys(userInfo).forEach(function(fieldName) {
          $('.user-info .' + fieldName).text(userInfo[fieldName]);
        });
      });
  },
  handleData: function(data) {
    // data is a DOM-like object, so `querySelectorAll` works
    const items = Array.from(data.querySelectorAll('item'));
    // map the list of items into nodes for html
    const nodes = items.map(function(item) {
      // make a node for the title
      const titleNode = document.createElement('strong');
      titleNode.innerHTML = item.querySelector('title').textContent +
        '&nbsp;';
      // make a node for the date
      const dateNode = document.createElement('em');
      dateNode.innerHTML = item.querySelector('pubDate').textContent +
        '&nbsp;';
      // make a node for the link
      const linkNode = document.createElement('a');
      linkNode.href = item.querySelector('link').textContent;
      linkNode.textContent = '(link)';
      // make a node for everything
      const articleNode = document.createElement('article');
      articleNode.appendChild(titleNode);
      articleNode.appendChild(dateNode);
      articleNode.appendChild(linkNode);
      return articleNode;
    });
    // clear out the container
    const container = document.getElementById('content');
    container.innerHTML = '';
    // append them all to the container
    nodes.forEach(function(node) {
      container.appendChild(node);
    });
  },
  handleSelectionChange: function() {
    // store the radio buttons as an array
    const buttons = Array.from(document.querySelectorAll('input'));
    // find the button that is checked and get its value
    const league = buttons.find(function(button) {
      return button.checked;
    }).value;
    const url = `http://espn.go.com/espn/rss/${league}/news`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        vm.handleData(xhr.responseXML);
      } else {
        const container = document.querySelector('content');
        container.innerHTML = '';
        container.textValue = 'An error occured reading the stream';
      }
    };
    xhr.send();
  },
  init: function() {
    // connect the change of event of the form to the method
    document.querySelector('form').addEventListener('change',
        vm.handleSelectionChange);
    
    vm.handleSelectionChange(); // call the method to simulate the first
                             // selection
  }
}

$(document).ready(function() {
  // $('.infinite-scroll').infiniteScroll({
  //   path: '.pagination__next',
  //   append: '.post',
  //   history: false
  // });
  vm.init();
});