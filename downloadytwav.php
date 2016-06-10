<!DOCTYPE html>
<html>
<body>

<h1>Youtube Downloader</h1>

<?php
/*ini_set('display_errors', 1);
error_reporting(E_ALL);

	echo "HELLO WORLD";
	if(isset($_POST['ytID']))
	{
	    $yturl = 'https://www.youtube.com/watch?v=' . $_POST['ytID'];
		echo ytID;
		$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/%(id)s.%(ext)s" ' . $yturl;
		exec($cmd) or die("cannot download video using youtube-dl");
	} else { 
		echo 'FAIL';
	} */

$yturl = 'https://www.youtube.com/watch?v=R2F_hGwD26g';
$cmd = 'youtube-dl --extract-audio --audio-format wav --output "./mp3files/%(id)s.%(ext)s" ' . $yturl;
exec($cmd) or die("cannot download video using youtube-dl");
?>

</body>
</html>