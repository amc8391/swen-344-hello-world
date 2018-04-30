<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html>
<body>

<?php

// Read the sessions
if ($_SESSION["username"] != "") {
	if ($_GET["name"] != "") {
		$_SESSION["name"] = $_GET["name"];
	}
	echo "<h1>Hello ";
	echo $_SESSION["username"] . "<br>";
	if ($_SESSION["name"] != "") {
		echo "Name: " . $_SESSION["name"];
	}
	echo "<h2> ";
?>
<form>
	<input type="text" name="name">
	<button>Submit Name</button>
</form>
<?php
}else{
?>

	You are not a valid user
	<?php
}
?>

</body>
</html>