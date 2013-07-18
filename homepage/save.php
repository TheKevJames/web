<?php 

$filename = $_POST['filename'];
$data = $_POST['data'];

$file = fopen($filename, "w");
fwrite($file, str_replace("\'","'",$data));
fclose($file);

?>