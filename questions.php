<b>
    Finished. Thank you!
</b>

<?php
$myfile = fopen("UserResults/userData.txt", "a") or die("Unable to open file!");

//submit time
date_default_timezone_set("America/Chicago");
fwrite($myfile,"Chicago Time: ");
fwrite($myfile, date("Y-m-d h:i:sa"));
fwrite($myfile,"\n");

//query index
fwrite($myfile,"1\n");

//bin 1~5
fwrite($myfile, $_POST["level1_set"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["level2_set"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["level3_set"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["level4_set"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["level5_set"]);
fwrite($myfile,"\n");

//questions
fwrite($myfile, $_POST["difficulty"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["confidence"]);
fwrite($myfile,"\n");

fwrite($myfile, $_POST["features"]);
fwrite($myfile,"\n");

fwrite($myfile,"\n");

fclose($myfile);

//function test_input($data) {
//    $data = trim($data);
//    $data = stripslashes($data);
//    $data = htmlspecialchars($data);
//    return $data;
//}
?>