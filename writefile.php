<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>


<?php
	echo "Hello World!";

	if(isset($_POST['beat1']))
	{
		echo "Received info from javascript.";
	    $beat = $_POST['beat1'];
		$myfile = fopen("./txtfiles/newfile.txt", "w+") or die("Unable to open file!");
		fwrite($myfile, $beat);
		fclose($myfile);
	} else {
		echo "Nothing received from javascript";
	}
?>

</body>
</html>



