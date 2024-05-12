<?php
session_start();
include_once "../db/Conexao.php";

// Verificar se todos os campos foram enviados
if (!isset($_POST['nome'], $_POST['email'], $_POST['password'])) {
    exit(json_encode(["success" => false, "message" => "Preencha todos os campos"]));
}

// Recuperar e validar os dados do formulário
$username = htmlspecialchars($_POST['nome']);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'];

// Verificar se o email é válido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit(json_encode(["success" => false, "message" => "Email inválido"]));
}

// Hash da senha
$hash_password = password_hash($password, PASSWORD_DEFAULT);

// Status padrão
$status = "offline";

try {
    global $Objecto_conexao;
    
    // Preparar e executar a query SQL
    $sql = "INSERT INTO tb_usuarios (username, email, password, status) VALUES (?, ?, ?, ?)";
    $stmt = $Objecto_conexao->prepare($sql);
    $stmt->execute([$username, $email, $hash_password, $status]);
    echo json_encode(["success" => true, "redirect" => "login.html"]);

} catch (PDOException $erro) {
    echo json_encode(["success" => false, "message" => "Erro ao inserir os dados: " . $erro->getMessage()]);
}
?>
