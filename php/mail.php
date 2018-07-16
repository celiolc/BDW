<?php

include 'functions.php';

if (!empty($_POST)){
  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress 
  $emailTo ="bdwgeneral@br.ibm.com"; //"bdwgeneral@br.ibm.com";

  //from email adress
  $emailFrom ="bdwgeneral@br.ibm.com"; //"bdwgeneral@br.ibm.com";

  //email subject
  $emailSubject = "BDW Website Form";

  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  if($name == "")
   $data['success'] = false;
 
  if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)) {
   echo "<script>alert('ERROR!! Your message was not sent. Inform a valid email address')</script>";
   echo "<meta http-equiv='refresh' content='0;URL=http://www.bdw-procurement.com'>";
   $data['success'] = false;
  }
 if($data['success'] == true){

  $message = "NAME: $name<br>
  EMAIL: $email<br>
  MESSAGE: $message";


  $headers = "MIME-Version: 1.0" . "\r\n"; 
  $headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
  $headers .= "From: <$emailFrom>" . "\r\n";
  mail($emailTo, $emailSubject, $message, $headers);

  $data['success'] = true;
  echo "<script>alert('Thanks for your message. We will use it to improve our platform!')</script>";
  echo "<meta http-equiv='refresh' content='0;URL=http://www.bdw-procurement.com'>";
	
 }
}
?>