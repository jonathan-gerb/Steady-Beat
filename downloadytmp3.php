<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
	echo "Hello World!";
	$cmd1 = 'youtube-dl'
	exec($cmd1) or die("Unable to execute youtube-dl");
	$cmd2 = 'youtube-dl --extract-audio --audio-format mp3 -o "./mp3files/%(title)s.%(ext)s"';
	exec($cmd2) or die("unable to execute mp3 dowloading");
?>

</body>
<!-- --output '/mp3files/%(title)s.%(ext)s' -->
</html>