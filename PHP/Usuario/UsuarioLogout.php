<?php
session_start();

// Limpar a sessão
$_SESSION = array();

// Invalidar o cookie de sessão
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destruir a sessão
session_destroy();

// Redirecionar para a página de login
header('Location: ../HTML/login.html');
exit;


?>