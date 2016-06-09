<!DOCTYPE html>
<html>
<body>

<h1>Youtube Downloader</h1>

<?php
    $yturl = 'https://www.youtube.com/watch?v=v04H7_fFC90';
	$cmd = 'youtube-dl --extract-audio --audio-format mp3 --output "./mp3files/%(id)s.%(ext)s" ' . $yturl;
	exec($cmd) or die("cannot download video using youtube-dl");
?>

</body>
</html>
