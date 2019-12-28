<?php
require_once __DIR__ . '/vendor/autoload.php';

// We used ElephantIO to implement SocketIO in PHP 

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

$request = $_SERVER['REQUEST_METHOD'];
// Connection between Node & PHP 
$version = new Version2X("http://localhost:3001");

$client = new Client($version);
$client->initialize();


if($request == 'GET'){
    // Get request to fetch all images from "img" directory
    $records = getAllImages();
    echo json_encode($records);
  //  $client->emit("new_image", $records);
}else if($request == 'POST'){
    // Post request to store image
    $target_dir = "./img/";
        
    $target_file = $target_dir . basename($_FILES["file"]["name"]);

    $fname = $_FILES["file"]["name"] ;
    
    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
     
    $records = getAllImages();
    // all records Emit new images to socket
    $client->emit("new_image", $records);
}

// Funtion to get the File Name
function getFileName($fname){
    $name = pathinfo($fname);
    return $name['filename'];
}
// Function to get all the images
function getAllImages(){
    $count = 0;
    $records=array();
    foreach (array_filter(glob('./img/*'), 'is_file') as $file)
        {
            $records[$count]['id'] = rand();
            $records[$count]['source'] = $file;
            $records[$count]['title'] = getFileName($file);
            $count++;
        }
        return $records ;
}

?>