<?php 
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
    $mail->Subject = 'שליחת תופס הזמנת צילום';

    $body = '<body dir ="rtl"><h1>שלום רב</h1>';

    if (!empty($_POST['name'])) {
        $body.='<p><strong> שם המזמין :</strong> '.$_POST['name'].'</p>';
    }
    if (!empty($_POST['phone'])) {
        $body.='<p><strong>טלפון :</strong> '.$_POST['phone'].'</p>';
    }
    if (!empty($_POST['nameProject'])) {
        $body.='<p><strong>שם הפרוייקט :</strong> '.$_POST['nameProject'].'</p>';
    }
    if (!empty($_POST['place'])) {
        $body.='<p><strong>מיקום הפרויקט :</strong> '.$_POST['place'].'</p>';
    }
    if (!empty($_POST['size'])) {
        $body.='<p><strong> גודל החלל:</strong> '.$_POST['size'].'</p>';
    }
    if (!empty($_POST['email'])) {
         $body.='<p><strong> אימייל :</strong> '.$_POST['email'].'</p>';
         $mail->addAddress($_POST['email']);
    }
    if (!empty($_POST['outdoor'])) {
        $body.='<p><strong> כולל צילומי חוץ</strong></p>';
    }
    if (!empty($_POST['comments'])) {
        $body.='<p><strong> הערות :</strong> '.$_POST['comments'].'</p>';
    }
    $rooms = '<p>חללים לצילום:</p><ul>';

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

    $rooms.='</ul></body>';
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