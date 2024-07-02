<?php

$servername = "localhost";
$username = "username";
$password = "password"; 
$dbname = "database"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        
        echo json_encode(array('success' => true));
    } else {
    
        echo json_encode(array('success' => false));
    }

   
    $stmt->close();
} else {

    echo json_encode(array('success' => false));
}

$conn->close();

?>
