<!DOCTYPE html>
<html>
<body>


<?php
	if(isset($_POST['youtubeId']))
	{
	    $ID = $_POST['youtubeId'];
		$command = "/vamp/release/sonic-annotator -d vamp:qm-vamp-plugins:qm-onsetdetector:onsets ./mp3files/" . $ID . ".mp3 -w  csv --csv-basedir ./onsets/ --force";
		exec($command); //or echo "hallloooooooo clara";
		exec("touch ./onsets/jonafile.txt");
		$myfile = fopen("./onsets/testfile.txt", "w");
		echo "whaaaaaaaaaaaaaaaaaaaaaaaa";
		fclose($myfile);
		echo "direct na command";

	} else {
		echo "No youtube ID received.";
	}
	echo "eind php";
	echo $command;
	echo $out;
?>
he adriaan
</body>
</html>
