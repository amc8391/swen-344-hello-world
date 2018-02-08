<?php
$formResponse = array();
if(isset($_GET['firstname'])) {
  $formResponse['firstname'] = $_GET['firstname'];
  $formResponse['lastname'] = $_GET['lastname'];
  $formResponse['message'] = 'Notice how information is appearing in the URL header?';
} else if(isset($_POST['firstname'])) {
  $formResponse['firstname'] = $_POST['firstname'];
  $formResponse['lastname'] = $_POST['lastname'];
  $formResponse['message'] = 'Notice how no information is appearing in the URL header?';
}
?>

<html>
<head>
	
</head>
<body>
  <p>First Name: <?php echo $formResponse['firstname']; ?></p>
  <p>Last Name: <?php echo $formResponse['lastname']; ?></p>

  <p><?php echo $formResponse['message'] ?></p>
</body>
</html>
