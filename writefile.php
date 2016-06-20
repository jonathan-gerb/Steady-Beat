<!DOCTYPE html>
<html>
<body>


<?php
	if(isset($_POST['beat']) && isset($_POST['ytID']))
	{
	    $beat = $_POST['beat'];
	    $ytID = $_POST['ytID'];
		$annotations = fopen("./txtfiles/" . $ytID . "-" . time() . ".txt", "w+") or die("Unable to open file!");
		$beatArray = explode(",", "$beat");
		foreach ($beatArray as $line){
		    fwrite($annotations, $line . "\n");
		}
		fclose($annotations);
		$wavFile = "./mp3files/" . $ytID . ".wav";
		unlink($wavFile);

	} else {
		echo "No beats and youtube ID received.";
	}
?>

</body>
</html>
