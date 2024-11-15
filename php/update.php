<?php
$username = "root";
$password = '';
$hostname = "localhost";
$database = 'todo';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Connection Failed");

$update = $decode['task'];
$old_update = $decode['old_task'];

$sql = "Update todos set task = '$update' where task = '$old_update'";
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array("update" => "success"));
} else {
    echo json_encode(array("update" => "error"));
}
