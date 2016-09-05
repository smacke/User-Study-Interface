<?php
$myfile = fopen("UserResults/newfile1.txt", "a") or die("Unable to open file!");

foreach ($_POST['ts'] as $value) {
    fwrite($myfile, $value);
    fwrite($myfile, ',');
}
fwrite($myfile,"\n");
fclose($myfile);
?>