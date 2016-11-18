<?php
$maxUsedTime = 200;

$queryUsedTime = array();
$file = fopen("UserResults/QueryUsedTime.csv", "r") or die("Unable to open file!");
while(! feof($file)) {
    $queryUsedTime[] = fgetcsv($file);
}
fclose($file);

$selectedQuery = array(-1,-1,-1,-1);
for($i = 0; $i < count($selectedQuery); ++$i) {
    $tmp = rand(0, (count($queryUsedTime)-1));
    while (intval($queryUsedTime[$tmp][1]) >= $maxUsedTime
        || in_array($tmp, $selectedQuery)
        || randAgain()) {
        $tmp = rand(0, (count($queryUsedTime)-1));
    }
    $selectedQuery[$i] = $tmp;
    $queryUsedTime[$tmp][1] = (string)(intval($queryUsedTime[$tmp][1]) + 1);
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

// More rules of randAgain like only one time series from a similar bucket
function randAgain() {
    return false;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Query worksheet</title>
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
            text-align:center;
            width:100%;
            font-size: 30px;
        }

        #buttonContainer {
            position: absolute;
            left: 42%;
            padding:20px;
            border: 20px;
         }

    </style>
</head>

<body>

<div class="title">
    <p><b>Query Worksheet of User Study</b></p>
    Here you get 4 queries to work on. Please click the following buttons one by one. When you finish one query, you can go back to this page and continue.
</div>

<br/><br/>

<div id="buttonContainer">
<?php
for($i = 0; $i < count($selectedQuery); ++$i) {
    $row = $selectedQuery[$i];
    $query = $queryUsedTime[$row][0];
    $queryNo = $i + 1;
    echo "<form target=\"_blank\" action=\"$query.html\">";
    echo "<input type=\"submit\" value=\"Query $queryNo\">";
    echo "</form>";
}
?>
</div>

</body>

</html>