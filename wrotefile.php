<!DOCTYPE html>
<html>
<body>
<?php
echo "AAAAAAA";
$f = fopen($_POST['ID'] . (string)time() . ".txt","w");
fwrite($f, $_POST['string']);
fclose($f);
?>
</body>
</html>
