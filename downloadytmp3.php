<!DOCTYPE html>
<html>
<body>

<h1>Youtube Downloader</h1>

<?php
	ini_set('display_errors',1);
	error_reporting(E_ALL);
    /*$yturl = 'https://www.youtube.com/watch?v=v04H7_fFC90';*/
	$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/%(title)s.%(ext)s" https://www.youtube.com/watch?v=lO6FP83HAXk';
	exec($cmd) or die("cannot download video using youtube-dl");
    /*var_export($output);*/
?>

</body>
</html>
