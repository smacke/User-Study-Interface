<?php
$queryName = $_POST['queryName'];
$queryNo = $_POST['queryNo'];
setcookie('queryNo', $queryNo);
$queryNameExplode = explode('-', $queryName,2);
$datasetName = $queryNameExplode[0];
$queryIndex = $queryNameExplode[1];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Study Interface for Visual Similarity</title>

    <!--import library-->
    <link rel="stylesheet" href="lib/jquery-ui-1.12.0/jquery-ui.css" />
    <script src="lib/jquery-ui-1.12.0/external/jquery/jquery.js"></script>
    <script src="lib/jquery-ui-1.12.0/jquery-ui.min.js"></script>
    <script src="lib/dygraph-combined-dev.js"></script>

    <script src="drag-drop-five-levels.js"></script>
    <link rel="stylesheet" href="drag-drop-five-levels.css">
</head>
<body>

<?php
echo "<input type=\"hidden\" id=\"DatasetName\"  value=\"$datasetName\" />";
echo "<input type=\"hidden\" id=\"QueryIndex\" value=\"$queryIndex\" />";
?>

<div id="container"></div>

</body>
</html>