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
	echo "<h1>Hello ";
    echo $_SESSION["username"];
		echo "<h2> ";
		if ($_SESSION["name"] != "") {
			echo "Name: " . $_SESSION["name"];
		}	
		echo "<a href=\"session3.php\">Another page</a>";
}else{
?>

	You are not a valid user


	<?php
}
?>




</body>
</html>
