<?php 
    use PHPMailer\PHPMailer\PHPMailer; 
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true); // assigning PHPMailer
    $mail->CharSet = 'UTF-8';  //encoding
    $mail->setLanguage('he', 'PHPMailer/language/'); //language
    $mail->IsHTML(true); //possibility to insert HTML tags in the mail

    $mail->setFrom('ashaturnaya@gmail.com', 'Alina Shahmurov'); //the letter from
    $mail->addAddress('ashaturnaya@gmail.com'); //the letter to
    $mail->Subject = 'שליחת תופס הזמנת צילום';

    $body = '<h1>שלום רב</h1>';

    if (!empty($_POST['nameProject'])) {
        $body.='<p><strong>:הזמנת עבודה עבור</strong> '.$_POST['nameProject'].'</p>';
    }
    if (!empty($_POST['place'])) {
        $body.='<p><strong>:מיקום הפרויקט</strong> '.$_POST['place'].'</p>';
    }
    if (!empty($_POST['size'])) {
        $body.='<p><strong>:גודל החלל</strong> '.$_POST['size'].'</p>';
    }
    if (!empty($_POST['email'])) {
         $body.='<p><strong> :אימייל</strong> '.$_POST['email'].'</p>';
    }
    if (!empty($_POST['comments'])) {
        $body.='<p><strong>הערות/strong> '.$_POST['comments'].'</p>';
    }

    if (!empty($_POST['outdoors'])) {
        $body.='<p><strong>צילומי חוץ/strong></p>';
    }

    $rooms = '<ul>';

    if ($_POST['salon'] != 0) {
        $rooms.='<li>סלון - '.$_POST['salon'].'</li>';
    }
    if ($_POST['kitchen'] != 0) {
        $rooms.='<li>מטבח - '.$_POST['kitchen'].'</li>';
    }
    if ($_POST['shower'] != 0) {
        $rooms.='<li>מקלחת - '.$_POST['shower'].'</li>';
    }
    if ($_POST['toilet-guests'] != 0) {
        $rooms.='<li>שרותי אורחים - '.$_POST['toilet-guests'].'</li>';
    }
    if ($_POST['bedroom-parents'] != 0) {
        $rooms.='<li>יחידת הורים - '.$_POST['bedroom-parents'].'</li>';
    }
    if ($_POST['bedroom'] != 0) {
        $rooms.='<li>חדר שינה - '.$_POST['bedroom'].'</li>';
    }
    if ($_POST['balcony'] != 0) {
        $rooms.='<li>מרפסת - '.$_POST['balcony'].'</li>';
    }

    $rooms.='</ul>';
    $body.= $rooms;

    $mail->Body = $body;

    if(!$mail->send()) { //event handler 'sending data'
        $message = 'Error';
    } else {
        $message = 'Your form was sent';
    }

    $response = ['message' => $message]; 
    header('Content-type: application/json');  //
    echo json_encode($response);
    
?>