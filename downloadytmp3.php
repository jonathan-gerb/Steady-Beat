<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
	echo "Hello World!";
	$cmd = 'youtube-dl --extract-audio --audio-format mp3';
	shell_exec($cmd) or die("unable to execute command");
?>

</body>
<!-- --output '/mp3files/%(title)s.%(ext)s' -->
</html>