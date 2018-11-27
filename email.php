<?php
if($_POST["message"]) {
    $email = $_POST["email"];
    if (!$email) $email = "Unknown";
    
    mail("email@learnwithsarah.ir", "Message from Learning With Sarah", $_POST["message"], "From: ".$email);
}

header("Location: contact.html");
die();
?>