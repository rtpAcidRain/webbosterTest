<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$product = $_POST['product'];
$price = $_POST['price'];
//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->setFrom('example@example.ru'); // от кого будет уходить письмо?
$mail->addAddress('example@example.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заказ';
$mail->Body    = '' .$name . ' оставил заявку!'."<br>" . "Номер телефона:" . $phone .'<br>'. 'Товар:'. $dNumber .'<br>'. 'Стоимость' . $start;
$mail->AltBody = '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}
?>