<?php
$queryUsedTime = array();
$file = fopen("UserResults/QueryUsedTime.csv", "r") or die("Unable to open file!");
while(! feof($file)) {
    $queryUsedTime[] = fgetcsv($file);
}
fclose($file);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View All Data Collection</title>
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

        .oneDataset {
            float:left;
            padding:20px;
            border: 20px;
        }

        .title {
            text-align:center;
            width:100%;
            font-size: 30px;
        }

    </style>
</head>
<body>

<div class="title">
    <p><b>View all queries and corresponding data collection</b></p>
    (DatasetName - QueryIndex)
</div>

<hr/>
<div>
    <p>k-Shape averaging centers as queries - diverse datasets</p>
</div>

<div class="oneDataset" id="50words">
    <?php
    for ($i = 0; $i < count($queryUsedTime); ++$i) {
        $queryName = $queryUsedTime[$i][0];
        $queryNameExplode = explode('-', $queryName,2);
        if ($queryNameExplode[0] == "50words") {
            echo "<form target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
            echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
            echo "<input type=\"submit\" value=\"$queryName\">";
            echo "</form>";
        }
    }
    ?>
</div>

<div class="oneDataset" id="ToeSegmentation2">
    <?php
    for ($i = 0; $i < count($queryUsedTime); ++$i) {
        $queryName = $queryUsedTime[$i][0];
        $queryNameExplode = explode('-', $queryName,2);
        if ($queryNameExplode[0] == "ToeSegmentation2") {
            echo "<form target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
            echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
            echo "<input type=\"submit\" value=\"$queryName\">";
            echo "</form>";
        }
    }
    ?>
</div>

<div class="oneDataset" id="WormsTwoClass">
    <?php
    for ($i = 0; $i < count($queryUsedTime); ++$i) {
        $queryName = $queryUsedTime[$i][0];
        $queryNameExplode = explode('-', $queryName,2);
        if ($queryNameExplode[0] == "WormsTwoClass") {
            echo "<form target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
            echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
            echo "<input type=\"submit\" value=\"$queryName\">";
            echo "</form>";
        }
    }
    ?>
</div>

<div class="oneDataset" id="uWaveGestureLibrary_X">
    <?php
    for ($i = 0; $i < count($queryUsedTime); ++$i) {
        $queryName = $queryUsedTime[$i][0];
        $queryNameExplode = explode('-', $queryName,2);
        if ($queryNameExplode[0] == "uWaveGestureLibrary_X"
            || $queryNameExplode[0] == "uWaveGestureLibrary_Y"
            || $queryNameExplode[0] == "uWaveGestureLibrary_Z") {
            echo "<form target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
            echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
            echo "<input type=\"submit\" value=\"$queryName\">";
            echo "</form>";
        }
    }
    ?>
</div>

<div class="oneDataset" id="Worms">
    <?php
    for ($i = 0; $i < count($queryUsedTime); ++$i) {
        $queryName = $queryUsedTime[$i][0];
        $queryNameExplode = explode('-', $queryName,2);
        if ($queryNameExplode[0] == "Worms") {
            echo "<form target=\"_blank\" action=\"UserStudy.php\" method=\"post\">";
            echo "<input type=\"hidden\" name='queryName' value='$queryName'>";
            echo "<input type=\"submit\" value=\"$queryName\">";
            echo "</form>";
        }
    }
    ?>
</div>

<!---->

<!--<div style="clear:both"></div>-->
<!--<hr/>-->
<!--<div>-->
<!--    <p>Previous Synthetic queries</p>-->
<!--</div>-->
<!---->
<!--<div class="oneDataset" id="50words_old">-->
<!--    <form target="_blank" action="50words-query2.html">-->
<!--        <input type="submit" value="50words-query2">-->
<!--    </form>-->
<!--</div>-->
<!---->
<!--<div class="oneDataset" id="uWaveGestureLibrary_X_old">-->
<!--    <form target="_blank" action="uWaveGestureLibrary_X-query1.html">-->
<!--        <input type="submit" value="uWaveGestureLibrary_X-query1">-->
<!--    </form>-->
<!--    <form target="_blank" action="uWaveGestureLibrary_X-query2.html">-->
<!--        <input type="submit" value="uWaveGestureLibrary_X-query2">-->
<!--    </form>-->
<!--</div>-->

</body>
</html>