<b>
    Finished. Thank you!
</b>

<?php
function openFile() {
    $currentTime = date("Y-m-d-h-i-sa");
    $fileName = "UserResults/" . $currentTime . ".txt";

    if (file_exists ( $fileName )) {
        sleep(1);
        return openFile();
    }
    else{
        $myfile = fopen($fileName, "a") or die("Unable to open file!");
        return $myfile;
    }
}

date_default_timezone_set("America/Chicago");
$myfile = openFile();

//submit time
fwrite($myfile,"Chicago Time: ");
fwrite($myfile, date("Y-m-d h:i:sa"));
fwrite($myfile,"\n");

//query index
fwrite($myfile,"1\n");

//bin 1~5
fwrite($myfile, test_input($_POST["level1_set"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["level2_set"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["level3_set"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["level4_set"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["level5_set"]));
fwrite($myfile,"\n");

//questions
fwrite($myfile, test_input($_POST["difficulty"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["confidence"]));
fwrite($myfile,"\n");

fwrite($myfile, test_input($_POST["features"]));
fwrite($myfile,"\n");

fclose($myfile);

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>