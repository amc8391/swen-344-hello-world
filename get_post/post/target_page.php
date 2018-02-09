<?php
$formResponse = array();
if(isset($_GET['firstname'])) {
  $formResponse['firstname'] = $_GET['firstname'];
  $formResponse['state'] = $_GET['state'];
  $formResponse['gender'] = $_GET['gender'];
  $formResponse['message'] = 'Notice how information is appearing in the URL header?';
} else if(isset($_POST['firstname'])) {
  $formResponse['firstname'] = $_POST['firstname'];
  $formResponse['state'] = $_POST['state'];
  $formResponse['gender'] = $_POST['gender'];
  $formResponse['message'] = 'Notice how no information is appearing in the URL header?';
}
?>

<html>
<head></head>
<body>
  <p>First Name: <?php echo $formResponse['firstname']; ?></p>
  <p>State: <?php echo $formResponse['state']; ?></p>
  <p>Gender: <?php echo $formResponse['gender']; ?></p>

  <p><?php echo $formResponse['message'] ?></p>
</body>
</html>
