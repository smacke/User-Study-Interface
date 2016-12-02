<?php
$maxUsedTime = 9999;

// generate new index
$file = fopen("UserResults/UserID.txt", "r") or die("Unable to open file!");
$lastIndex = intval(fgets($file));
fclose($file);

$userID = $lastIndex + 1;

$file = fopen("UserResults/UserID.txt", "w") or die("Unable to open file!");
fwrite($file, (string)$userID);
fclose($file);
setcookie('userID', $userID);



$queryUsedTime = array();
$file = fopen("UserResults/QueryUsedTime.csv", "r") or die("Unable to open file!");
while(! feof($file)) {
    $tmp = fgetcsv($file);
    if ($tmp[0] != '') {
        $queryUsedTime[] = $tmp;
    }
}
fclose($file);


if ($userID == 14)
    $selectedQuery = array(1, 2, 4, 6, 7, 9, 16, 18);
elseif ($userID == 15)
    $selectedQuery = array(2, 3, 4, 5, 7, 9, 11, 13);
elseif ($userID == 16)
    $selectedQuery = array(8, 9, 11, 12, 13, 15, 17, 18);
elseif ($userID == 17)
    $selectedQuery = array(0, 1, 5, 10, 11, 13, 15, 18);
elseif ($userID == 18)
    $selectedQuery = array(0, 2, 7, 8, 9, 12, 13, 15);
elseif ($userID == 19)
    $selectedQuery = array(0, 1, 7, 8, 9, 12, 13, 15);
elseif ($userID == 20)
    $selectedQuery = array(1, 2, 7, 9, 10, 12, 13, 15);
else {
    $selectedQuery = array(-1, -1, -1, -1, -1, -1, -1, -1);
    for($i = 0; $i < count($selectedQuery); ++$i) {
        $tmp = rand(0, (count($queryUsedTime)-1));
        while (intval($queryUsedTime[$tmp][1]) >= $maxUsedTime
            || in_array($tmp, $selectedQuery)
            || randAgain()) {
            $tmp = rand(0, (count($queryUsedTime)-1));
        }
        $selectedQuery[$i] = $tmp;
    }
}

// More rules of randAgain like only one time series from a similar bucket
function randAgain() {
    return false;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Query Worksheet</title>
    <link rel="stylesheet" href="lib/jquery-ui-1.12.0/jquery-ui.css" />
    <script src="lib/jquery-ui-1.12.0/external/jquery/jquery.js"></script>
    <script src="lib/jquery-ui-1.12.0/jquery-ui.min.js"></script>
    <style type="text/css">
        body html { height:100%; width:100%;}

        input {
            background-color: white;
            color: black;
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            -webkit-transition-duration: 0.2s; /* Safari */
            transition-duration: 0.2s;
            cursor: pointer;
            border: 2px solid rgba(59, 59, 59, 0.89);
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        }

        input:hover {
            background-color: #5c56ff;
            color: white;
            border: 2px solid #5c56ff;
        }

        .title {
            text-align: left;
            width:100%;
            font-size: 20px;
        }

        #buttonContainer {
            position: absolute;
            left: 40%;
            padding:20px;
            border: 20px;
         }

    </style>
</head>

<body>

<div class="title">
    <p style="text-align: center"><b>Query Worksheet of User Study</b></p>
    Here you get 8 queries and 1 survey to work on. Please click the following buttons one by one.
    <br/>
    When you finish one query, you may go back to this page and continue.
    <br/><br/>
    NOTE: Please DO NOT refresh this page. If you do that, you will discard all you have done and receive a totally new user study.
    <br/><br/>
    <?php echo "<div style=\"text-align: center\"> Your user ID is: $userID</div>"; ?>
</div>

<br/><br/>

<div id="buttonContainer">
<?php
for($i = 0; $i < count($selectedQuery); ++$i) {
    $row = $selectedQuery[$i];
    $queryName = $queryUsedTime[$row][0];
    $queryNo = $i + 1;
//    setcookie('queryName',$queryName);
    echo "<form class=\"submitForm\" target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
    echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
    echo "<input type=\"hidden\" name='queryNo' value='$queryNo'>";

    echo "<input type=\"submit\" value=\"Query $queryNo\">";
//    echo "<input type=\"submit\" value=\"$queryName\">";

    echo "</form>";
}
?>
    <form class="survey" target="_blank" action="UserSurvey.html" method="post">
        <input type="submit" value="User Survey">
    </form>

<!--    <form class="Finish" target="_blank" action="Finish.php" method="post">-->
<!--        <input type="submit" value="I have finished all above.">-->
<!--    </form>-->

</div>

</body>

</html>