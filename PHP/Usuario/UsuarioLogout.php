<?php
session_start(); // Inicia a sessão

// Limpa todos os dados de sessão
session_unset();
session_destroy();

// Responde com um JSON indicando sucesso
echo json_encode(["success" => true, "message" => "Logout realizado com sucesso"]);
exit();
?>
