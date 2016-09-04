欢迎 <?php echo $_POST["fname"]; ?>!<br>
你的年龄是 <?php echo $_POST["age"]; ?>  岁。


<?php
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = $_POST["fname"];
fwrite($myfile, $txt);
$txt = "Jane Doe\n";
fwrite($myfile, $_POST["age"]);
fclose($myfile);
?>