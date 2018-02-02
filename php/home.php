<?php
$page_content = json_decode(file_get_contents('http://localhost/api.php?page=home'));

echo('<html><body>');
include('navbar.php');
echo('<div>');

echo('<h1>' . $page_content->title . '</h1>');

foreach ($page_content->messages as $message) {
  echo('<p>' . $message . '</p>');
}

echo('</div>');
echo('</body></html>');