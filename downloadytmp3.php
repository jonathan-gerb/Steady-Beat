<!DOCTYPE html>
<html>
<body>

<h1>Youtube Downloader</h1>

<?php
    $yturl = 'https://www.youtube.com/watch?v=eHJ7An2CMB4';
	$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/%(title)s.%(ext)s" ' . $yturl;
	exec($cmd) or die("cannot download video using youtube-dl");
?>

</body>
</html>
