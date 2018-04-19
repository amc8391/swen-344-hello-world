<?php
ini_set('display_errors', 1); error_reporting(E_ALL);

function get_favorites($username, $password) {
  $userList = load_users();
  $favorites = NULL;
  foreach ($userList->users as $user) {
    if ($user->username === $username && $user->password === $password) {
      $favorites = $user->favorites;
    }
  }
  return $favorites;
}

function add_favorite($username, $password, $favorite) {
  $userList = load_users();
  $selectedUser = NULL;
  foreach ($userList->users as $user) {
    if ($user->username === $username && $user->password === $password) {
      $selectedUser = $user;
      break;
    }
  }
  
  if ($selectedUser != NULL) {
    array_push($selectedUser->favorites, json_decode($favorite));
    $save_users($userList);
  } else {
    error();
  }
}

function remove_favorite($username, $password, $favorite) {
  $userList = load_users();
  $selectedUser = NULL;
  foreach ($userList->users as $user) {
    if ($user->username === $username && $user->password === $password) {
      for ($i=0; $i < count($user->favorites); $i++) { 
        if ($user->favorites[$i]->guid === $favorite->guid){
          unset($user->favorites[$i]);
        }
        break;
      }
    }
  }
  
  $save_users($userList);
}

function load_users() {
  $users_filename = 'users.json';
  $result = null;
  $myfile = fopen($users_filename, 'r') or die("Unable to open file!");
  $result = fread($myfile, filesize($users_filename));
  fclose($myfile);
  return json_decode($result);
}

function save_users($usersList) {
  $users_filename = 'users.json';
  $myfile = fopen($users_filename, 'w') or die("Unable to open file!");
  fwrite($myfile, json_encode($usersList));
  fclose($myfile);
}

function register_user($username, $password) {
  $userList = load_users();

  $user_exists = FALSE;
  foreach ($userList->users as $user) {
    if ($user->username === $username) {
      $user_exists = TRUE;
      break;
    }
  }

  if (!$user_exists) {
    $newUser = array(
      'username' => $username,
      'password' => $password,
      'favorites' => array()
    );
  
    array_push($userList->users, $newUser);
    save_users($userList);
  } else {
    error();
  }
}

function error() {
  $code = 400;
  $text = 'Bad Request';

  $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');
  header($protocol . ' ' . $code . ' ' . $text);
  $GLOBALS['http_response_code'] = $code;
}

function handleRequest() {
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($_GET['command'] === 'favorites') {
      $data = get_favorites($_GET['username'], $_GET['password']);
    } else {
      error();
    }

  } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['command'] === 'register') {
      $data = register_user($_POST['username'], $_POST['password']);
    } else if ($_POST['command'] === 'add_favorite') {
      $data = add_favorite($_POST['username'], $_POST['password'], $_POST['favorite']);
    } else if ($_POST['command'] === 'remove_favorite') {
      $data = add_favorite($_POST['username'], $_POST['password'], $_POST['favorite']);
    } else {
      error();
    }

  } else {
    error();
  }
  
  header('Content-Type: application/json');
  echo json_encode($data);
}

handleRequest();
?>
