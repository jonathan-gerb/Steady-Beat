<!DOCTYPE html>
<html>
<body>


<?php
	if(isset($_POST['youtubeId']))
	{
	    $ID = $_POST['youtubeId'];
		exec("touch ./onsets/lETmskoqh30_vamp_qm-vamp-plugins_qm-onsetdetector_onsets.csv");
		chmod("./onsets/lETmskoqh30_vamp_qm-vamp-plugins_qm-onsetdetector_onsets.csv", 0777);
		$command = "./vamp/release/sonic-annotator.exe -d vamp:qm-vamp-plugins:qm-onsetdetector:onsets ./mp3files/" . $ID . ".mp3 -w  csv --csv-basedir ./onsets/ --force";
		exec("./vamp/release/sonic-annotator.exe -d vamp:qm-vamp-plugins:qm-onsetdetector:onsets ./mp3files/" . $ID . ".mp3 -w  csv --csv-basedir ./onsets/ --force"); //or echo "hallloooooooo clara";
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
