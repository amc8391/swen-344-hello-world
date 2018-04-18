var storyList = [];
var favorites = [];
var nodeList = [];

$(document).ready(function() {
  init();
});

function init(){
  //NHL URL for ESPN RSS feed
  
  // Check if user is logged in
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
  // $("#logo").attr("src",logoSrc);
  
  var itemsObjects = Array.from(items).map(newsItem => {
    return {
      image,
      logoSrc,
      logoLink,
      title: newsItem.querySelector("title").firstChild.nodeValue,
      description: newsItem.querySelector("description").firstChild.nodeValue,
      pubDate: newsItem.querySelector("pubDate").firstChild.nodeValue,
      link: newsItem.querySelector("link").firstChild.nodeValue,
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
    var line = '<div class="item">';
    line += '<a href="' + item.logoSrc + '"<img src="' + item.url + '"></a>"';
    line += "<h2>" + item.title + "</h2>";
    line += '<p><i>' + item.pubDate + '</i> - <a href="' + item.link + '" target="_blank">See original</a></p>';
    //title and description are always the same (for some reason) so I'm only including one
    line += "<p>" + item.description + "</p>";
    line += "</div>";
    $('#storyList').append(line);
    // $('#storyList').append('<div>' + item.pubDate + '||' +  item.title + '</div>');
  })
}

function logIn() {
  var username = $('input[name="username"]')[0].value;
  var password = $('input[name="password"]')[0].value;
  $.get('api.php?command=favorites&username=' + username + '&password=' + password).done(data => { 
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