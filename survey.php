You have just finished this survey. Please return to Query Worksheet and continue.

<?php
$userID = $_COOKIE['userID'];

function openFile() {
    $fileName = "UserResults/UserSurvey.csv";
    $myfile = fopen($fileName, "a");

    if (flock($myfile, LOCK_EX)) {
        return $myfile;
    }
    else {
        fclose($myfile);
        sleep(1);
        return openFile();
    }
}

date_default_timezone_set("America/Chicago");
$myfile = openFile();

//User ID
fwrite($myfile,(string)$userID);
fwrite($myfile,",");

//submit time
fwrite($myfile,"Chicago Time: ");
fwrite($myfile, date("Y-m-d h:i:sa"));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["gender"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["age"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["department"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["experience"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["tools_answer"]));

fwrite($myfile,"\n");

flock($myfile, LOCK_UN);
fclose($myfile);

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    $order = array("\n", "\r");
    $replace = "\t";
    $data = str_replace($order, $replace, $data);

    $order = (",");
    $replace = ";";
    $data = str_replace($order, $replace, $data);
    return $data;
}
?>