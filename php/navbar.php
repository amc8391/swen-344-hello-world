<?php
$nav_content = json_decode(file_get_contents('http://localhost/api.php?page=nav'));

echo('<div>');

foreach ($nav_content->links as $link) {
  echo('<li><a href="' . $link->href . '.php">' . $link->title . '</a></p>');
}

echo('</div>');

echo('<div><a href="https://secure.php.net/"><img class="frameworkLogo" src="https://seeklogo.com/images/P/php-logo-ADE513E748-seeklogo.com.png"></a></div>');