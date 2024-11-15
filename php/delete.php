<?php
header('Content-Type: application/json');

$username = "root";
$password = '';
$hostname = "localhost";
$database = 'todo';

if (!isset($_GET['delete'])) {
    echo json_encode(array("delete" => "invalid_request"));
    exit;
}

$delete = $_GET['delete'];
$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) {
    echo json_encode(array("delete" => "connection_failed", "error" => mysqli_connect_error()));
    exit;
}

$sql = "DELETE FROM todos WHERE task = '$delete'";
$result = mysqli_query($conn, $sql);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode(array("delete" => "success"));
    } else {
        echo json_encode(array("delete" => "not_found", "message" => "No matching task found"));
    }
} else {
    echo json_encode(array("delete" => "error", "sql_error" => mysqli_error($conn)));
}

mysqli_close($conn);
exit;
