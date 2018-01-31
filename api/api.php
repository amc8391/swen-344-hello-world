<?php
$homePage = array(
  'title' => 'Hello World!',
  'messages' => array(
    'Hello world! This is Alex Christodoulou\'s "Hello world" webpage.'
  ),
);

$navLinks = array(
  'links' => array(
    'title' => 'About Me',
    'href' => 'about',
  ),
);

$aboutPage = array(
  'title' => 'About Alex Christodoulou',
  'messages' => array(
    'My name is Alex Christodoulou and I\'m a 5th year Software Engineering major at RIT.',
    'I\'m a big fan of video games, board games, music and hiking.',
    'Here\'s a few of my favorite albums:',
  ),
  'images' => array(
    array(
      'src' => 'https://cdn.shopify.com/s/files/1/0844/5451/products/albums-testarossa-1_1024x1024.jpg?v=1501169490',
      'alt' => 'Yoni & Geti - Testarossa',
    ),
    array(
      'src' => 'https://upload.wikimedia.org/wikipedia/en/f/fe/OfMontreal_FalsePriest_600.jpg',
      'alt' => 'of Montreal - False Priest',
    ),
    array(
      'src' => 'https://en.wikipedia.org/wiki/Doolittle_(album)#/media/File:Pixies-Doolittle.jpg',
      'alt' => 'Pixies - Doolittle',
    ),
  )
);

$apiDocs = array(
  'examples' => array(
    '/api.php?page={pagename}',
    '/api.php?page=about',
    '/api.php?page=home',
    '/api.php?page=nav',
  ),
  'pages' => array(
    'about',
    'home',
    'nav',
  ),
);

$errorPage = array(
  'title' => '400 - Bad Request',
  'messages' => array(
    'You broke the API!',
    'Also I don\'t know how to change status codes in PHP',
  ),
);

$routes = array(
  'about' => $aboutPage,
  'home' => $homePage,
  'nav' => $navLinks,
);

$response = $errorPage;

if (isset($_REQUEST['page'])) {
  $decoded = $_REQUEST['page'];
  if (array_key_exists($decoded, $routes)) {
    $response = $routes[$decoded];
  }
} else {
  $response = $apiDocs;
}

$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);