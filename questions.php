<b>
    Finished. Thank you!
</b>

<?php
function openFile() {
    $fileName = "UserResults/" . test_input($_POST["query_index"]) . ".csv";
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

//submit time
fwrite($myfile,"Chicago Time: ");
fwrite($myfile, date("Y-m-d h:i:sa"));
fwrite($myfile,",");

//bin 1~5
fwrite($myfile, test_input($_POST["level1_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level2_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level3_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level4_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level5_set"]));
fwrite($myfile,",");

//questions
fwrite($myfile, test_input($_POST["difficulty"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["confidence"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["features"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["gender"]));
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