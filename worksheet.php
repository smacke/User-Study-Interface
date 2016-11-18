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
    while (intval($queryUsedTime[$tmp][1]) >= $maxUsedTime || in_array($tmp, $selectedQuery)) {
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

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Query worksheet</title>
</head>

<body>
<?php
for($i = 0; $i < count($selectedQuery); ++$i) {
    $row = $selectedQuery[$i];
    $text = $queryUsedTime[$row][0];
    echo "$text<br>";
}
?>

</body>

</html>