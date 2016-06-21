<!DOCTYPE html>
<html>
<body>


<?php
	if(isset($_POST['youtubeId']))
	{
	    $ID = $_POST['youtubeId'];
		$command = "./vamp/release/sonic-annotator -d vamp:qm-vamp-plugins:qm-onsetdetector:onsets ./mp3files/lETmskoqh30.mp3 -w csv --csv-one-file ./onsets/ testy.csv";
		exec($command);
		exec("copy NUL EMptyFile.txt");
		echo "direct na command";
	} else {
		echo "No youtube ID received.";
	}
	echo "eind php";
	echo $command;
?>
hallooooooo skajfd;lskajdf;lasdkf
</body>
</html>
