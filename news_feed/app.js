var storyList = [];
var favorites = [];
var nodeList = [];

$(document).ready(function() {
  init();
});

function init(){
  $('#newsFeed').hide();
  
  // Check if user is logged in
  if (localStorage.getItem('username') && localStorage.getItem('password')) {
    getFavorites(localStorage.getItem('username'), localStorage.getItem('password'));
  }
  // Get user's favorite list
  // Display RSS feed
  loadRssStories();

  // Register Event Handlers
  $('.rss-feed-options :checkbox').change(loadRssStories);
  $('#login').click(logIn);
  $('#register').click(register);
}

function loadRssStories() {
  storyList = [];
  $('#storyList').empty();
  getSelectedFeedUrls().forEach(url => { 
    $.get(url).done(data => { 
      xmlLoaded(data);
    });
  });
}

function getSelectedFeedUrls() {
  return $('.rss-feed-options :checked')
          .toArray()
          .map(checkbox => {
            return "http://www.espn.com/espn/rss/" + checkbox.value + "/news";
          });
}

function xmlLoaded(obj){
  var items = obj.querySelectorAll("item");
  
  //show the logo
  var image = obj.querySelector("image");
  var logoSrc = image.querySelector("url").firstChild.nodeValue;
  var logoLink = image.querySelector("link").firstChild.nodeValue;
  
  var itemsObjects = Array.from(items).map(newsItem => {
    return {
      image,
      logoSrc,
      logoLink,
      title: newsItem.querySelector("title").firstChild.nodeValue,
      description: newsItem.querySelector("description").firstChild.nodeValue,
      pubDate: newsItem.querySelector("pubDate").firstChild.nodeValue,
      link: newsItem.querySelector("link").firstChild.nodeValue,
      guid: newsItem.querySelector("guid").firstChild.nodeValue,
    }
  });
  nodeList = nodeList.concat(items);
  storyList = storyList.concat(itemsObjects)
    .sort((story1, story2) => {
      return new Date(story2.pubDate) - new Date(story1.pubDate);
    });
  populateStoryList();
}	

function populateStoryList() {
  
  $('#storyList').empty();
  
  storyList.forEach(item => {
    //present the item as HTML
    var line = '<div class="item card row">';
    line += '<div class="card-body">';
    line += '<a href="' + item.logoLink + '"><img src="' + item.logoSrc + '"></a>';
    line += '<h2 class="card-title">' + item.title + "</h2>";
    line += '<p><i>' + item.pubDate + '</i> - <a href="' + item.link + '" target="_blank">See original</a></p>';
    //title and description are always the same (for some reason) so I'm only including one
    line += '<div class="card-text">' + item.description + '</div>';
    line += '<button class="btn">Add as favorite</button>';
    line += "</div>";
    line += "</div>";
    $('#storyList').append(line);
  })
}

function logIn() {
  var username = $('input[name="username"]')[0].value;
  var password = $('input[name="password"]')[0].value;

  getFavorites(username, password);
}

function getFavorites(username, password) {
  $.get('api.php', {
    'command': 'favorites',
    'username': username,
    'password': password,
  }).done(data => { 
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    favorites = data;
    $('#loginForm').hide();
    $('#newsFeed').show();
  });
}

function register() {
  var username = $('input[name="username"]')[0].value;
  var password = $('input[name="password"]')[0].value;
  $.post('api.php', {
    'command': 'register',
    'username': username,
    'password': password,
  }).done(data => {
    logIn();
  });
}

function addFavorite(username, password, favorite) {
  $.post('api.php', {
    'command': 'add_favorite',
    'username': username,
    'password': password,
    'favorite': favorite,
  });
}

function removeFavorite(username, password, favorite) {
  $.post('api.php', {
    'command': 'remove_favorite',
    'username': username,
    'password': password,
    'favorite': favorite,
  });
}