<!DOCTYPE html>
<html>
<body>

<?php
	if(isset($_POST['beat']) && isset($_POST['ytID']))
	{
	    $beat = $_POST['beat'];
	    $ytID = $_POST['ytID'];
		$myfile = fopen("./txtfiles/" . $ytID . "-" . time() . ".txt", "w+") or die("Unable to open file!");
		$beatArray = explode(",", "$beat");
		foreach ($beatArray as $line){
		    fwrite($myfile, $line . "\n");
		}
		fclose($myfile);
	} else {
		echo "No beats and youtube ID receied.";
	}
?>

</body>
</html>



