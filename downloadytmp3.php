<!DOCTYPE html>
<html>
<body>

<h1>Youtube Downloader</h1>

<?php
/*ini_set('display_errors', 1);
error_reporting(E_ALL); */

	if(isset($_POST['ID'])) {
        $ID = $_POST['ID'];
		$yturl = 'https://www.youtube.com/watch?v=' . $ID;
		$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/%(id)s.%(ext)s" ' . $yturl;
		exec($cmd) or die("cannot download video using youtube-dl");
	}	else {
		$yturl = 'https://www.youtube.com/watch?v=Qpl7XU9sLfs';
		$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/FAIL%(id)s.%(ext)s" ' . $yturl;
		exec($cmd) or die("cannot download video using youtube-dl");

	}

?>

</body>
</html>
