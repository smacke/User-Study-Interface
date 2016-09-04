<?php echo "hello" ?>


<?php
$myfile = fopen("UserResults/newfile1.txt", "w") or die("Unable to open file!");

foreach ($_POST['ts'] as $value) {
    fwrite($myfile, $value);
}
fwrite($myfile, "\nend of file");
fclose($myfile);
?>