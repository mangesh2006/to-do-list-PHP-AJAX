<?php
$username = "root";
$password = '';
$hostname = "localhost";
$database = 'todo';

header('Content-Type: application/json');
$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Connection Failed");

$task = $decode['text'];

$sql = "Insert into todos(task) values('$task')" or die("SQL Failed");
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array('insert' => 'success'));
} else {
    echo json_encode(array('insert' => 'error'));
}

mysqli_close($conn);
