<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>


<?php
	echo "Hello World!";

	if(isset($_POST['beat']))
	{
		echo "Received info from javascript.";
	    $beat = $_POST['beat'];
		$myfile = fopen("./txtfiles/newfile.txt", "w+") or die("Unable to open file!");
		$beatArray = explode(",", "$beat");
		foreach ($beatArray as $line){
		    fwrite($myfile, $line . "\n");
		}
		fclose($myfile);
	} else {
		echo "Nothing received from javascript";
	}
?>

</body>
</html>



