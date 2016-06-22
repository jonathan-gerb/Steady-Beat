<!DOCTYPE html>
<html>
<body>


<?php
	if(isset($_POST['youtubeId']))
	{
	    $ID = $_POST['youtubeId'];
		// exec("touch ./onsets/lETmskoqh30_vamp_qm-vamp-plugins_qm-onsetdetector_onsets.csv");
		// chmod("./onsets/lETmskoqh30_vamp_qm-vamp-plugins_qm-onsetdetector_onsets.csv", 0777);
		$command = "sonic-annotator -d vamp:qm-vamp-plugins:qm-onsetdetector:onsets ./mp3files/" . $ID . ".mp3 -w  csv --csv-basedir ./onsets/ --force";
		exec($command); //or echo "hallloooooooo clara";
	} else {
		echo "No youtube ID received.";
	}
?>
he adriaan
</body>
</html>
