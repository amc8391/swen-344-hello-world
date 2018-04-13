var getRandomString = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

$(document).ready(function() {
  $('.infinite-scroll').infiniteScroll({
    path: '.pagination__next',
    append: '.post',
    history: false
  });
});