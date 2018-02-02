<?php
$page_content = json_decode(file_get_contents('http://localhost/api.php?page=about'));

echo('<html><body>');
include('navbar.php');
echo('<div>');
echo('<h1>' . $page_content->title . '</h1>');

foreach ($page_content->messages as $message) {
  echo('<p>' . $message . '</p>');
}

foreach ($page_content->images as $image) {
  echo('<img class="albumImage" src="' . $image->src . '" alt="' . $image->alt . '">');
}

echo('</div>');
echo('</body></html>');