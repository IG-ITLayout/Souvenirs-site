<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setForm('antixrizt@rambler.ru');
// Кому письмо
$mail->addAdress('antixrizt@rambler.ru');
//Тема письма
$mail->Subject = 'Новый заказ';

//Тело письма

$body = '<h1>Новый заказ</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong>'Имя:</srong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['number']))){
  $body.='<p><strong>'Номер:</srong> '.$_POST['number'].'</p>';
}

$mail->Body = $body;

//Отправка
if (!$mail->send()){
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены, ожидайте звонка.';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>