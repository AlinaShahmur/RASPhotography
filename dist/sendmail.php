<?php 
//We connected files from  to enable the plugin PHPMailer
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true); // assigning PHPMailer
$mail->CharSet = 'UTF-8';  //encoding
$mail->setLanguage('he', 'PHPMailer/language/'); //language
$mail->IsHTML(true); //possibility to insert HTML tags in the mail

$mail->setFrom('ras.photography@mail.com', 'Roman Shahmurov'); //the letter from
$mail->addAddress('ras.photography@mail.com'); //the letter to
$mail->Subject = 'יצירת קשר מאתר';

$body = '<h1>Welcome</h1>';

//letter body, emptiness validation
if (!empty($_POST['name'])) {
    $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
}
if (!empty($_POST['email'])) {
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}
if (!empty($_POST['phone'])) {
    $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
}
if (!empty($_POST['message'])) {
     $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body; //we assign thr letter body to plugin

if(!$mail->send()) { //event handler 'sending data'
    $message = 'Error';
} else {
    $message = 'The data is sent';
}

$response = ['message' => $message]; 

header('Content-type: application/json');  //
echo json_encode($response);
?>