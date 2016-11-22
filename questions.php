<?php
$userID = $_COOKIE['userID'];
$queryNo = $_COOKIE['queryNo'];
///////////////////////

function openFile() {
    $fileName = "UserResults/UserStudy/" . $_POST["dataset_name"] . "-" . $_POST["query_index"] . ".csv";
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

date_default_timezone_set("America/Chicago");
$myfile = openFile();

//User ID
fwrite($myfile,(string)$userID);
fwrite($myfile,",");

//submit time
fwrite($myfile,"Chicago Time: ");
fwrite($myfile, date("Y-m-d h:i:sa"));
fwrite($myfile,",");

//bin 4~1
fwrite($myfile, test_input($_POST["level4_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level3_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level2_set"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["level1_set"]));
fwrite($myfile,",");

//questions
fwrite($myfile, test_input($_POST["difficulty"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["confidence"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["features"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["bin4-features"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["bin3-features"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["bin2-features"]));
fwrite($myfile,",");

fwrite($myfile, test_input($_POST["bin1-features"]));
fwrite($myfile,"\n");

flock($myfile, LOCK_UN);
fclose($myfile);

$fileID = fopen('UserResults/DragDropLogs.csv','a');
fwrite($fileID, $_POST["dragDropLogs"]);
fclose($fileID);


$queryName = $_POST["dataset_name"] . "-" . $_POST["query_index"];
/////////////////////////////////
$queryUsedTime = array();
$file = fopen("UserResults/QueryUsedTime.csv", "r") or die("Unable to open file!");
while(! feof($file)) {
    $queryUsedTime[] = fgetcsv($file);
}
fclose($file);

for($i = 0; $i < count($queryUsedTime); ++$i) {
//    $tmp = rand(0, (count($queryUsedTime)-1));
//    while (intval($queryUsedTime[$tmp][1]) >= $maxUsedTime
//        || in_array($tmp, $selectedQuery)
//        || randAgain()) {
//        $tmp = rand(0, (count($queryUsedTime)-1));
//    }
//    $selectedQuery[$i] = $tmp;
    if ($queryUsedTime[$i][0] == $queryName) {
//        echo "$queryName<br>";
        $queryUsedTime[$i][1] = (string)(intval($queryUsedTime[$i][1]) + 1);
    }
}

$file = fopen("UserResults/QueryUsedTime.csv", "w") or die("Unable to open file!");
for($i = 0; $i < count($queryUsedTime); ++$i) {
    $text = ($queryUsedTime[$i][0] . "," . $queryUsedTime[$i][1]);
    if ($i < (count($queryUsedTime)-1) ) {
        $text = $text . "\n";
    }
    fwrite($file, $text);
}
fclose($file);
///////////////////////////////////

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script>
        <?php
        echo "console.log(\"Query name: $queryName\");";
        ?>
    </script>
</head>
<body>
<?php
echo "<br>You have just finished <strong>Query $queryNo</strong>.<br/>Now you may close this page and go back to Query Worksheet page.</br>";
?>
</body>
</html>
