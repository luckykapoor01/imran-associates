<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = trim($_POST['name']);
    $phone   = trim($_POST['phone']);
    $email   = trim($_POST['email']);
    $message = trim($_POST['message']);

    $to = "luckykapoor000111@gmail.com";
    $subject = "New Contact Form Message";

    $body  = "You received a new message:\n\n";
    $body .= "Name: $name\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message";

    $headers  = "From: Website <no-reply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Try to send mail (will fail on localhost, OK)
    mail($to, $subject, $body, $headers);

    // ✅ REDIRECT USER
    header("Location: index.php?status=success");
    exit;
}
?>