<?php
session_start();
include_once "../db/Conexao.php";
header('Content-Type: application/json');

try {
    global $Objecto_conexao;

    function EmailExists($EmailParam)
    {
        global $Objecto_conexao;
        $sql = "SELECT email FROM tb_usuarios WHERE email = ?";
        $stmt = $Objecto_conexao->prepare($sql);
        $stmt->execute([$EmailParam]);
        $Results = $stmt->fetch(PDO::FETCH_ASSOC);
        return $Results ? true : false;
    }

    // Recuperar e validar os dados do formulário
    $username = htmlspecialchars($_POST['nome'], ENT_QUOTES, 'UTF-8');
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];

    // Verificar se todos os campos foram enviados
    if (empty($username) || empty($email) || empty($password)) {
        echo(json_encode(["AllCamps" => true, "MessageAllCamps" => "Preencha todos os campos"]));
        exit();
    }

    // Verificar se o email é válido
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo(json_encode(["EmailInvalid" => true, "MessageEmailInvalid" => "Email inválido"]));
        exit();
    }

    // Verificar se o email já existe
    if (EmailExists($email)) {
        echo(json_encode(["EmailExists" => true, "MessageEmailExists" => "Este email já está em uso"]));
        exit();
    }

    // Verificar se a senha é válida
    if (strlen($password) < 8 || !preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\/\|\[\]{};\'":\\?><,.\/~]).{8,}$/', $password)) {
        echo(json_encode(["PasswordValid" => false, "MessagePassword" => "A sua senha precisa ter pelo menos 8 caracteres, um número de 0-9, um caracter especial e uma letra maiúscula"]));
        exit();
    }

    // Hash da senha
    $hash_password = password_hash($password, PASSWORD_DEFAULT);

    // Status padrão
    $status = "online";

    // Preparar e executar a query SQL
    $sql = "INSERT INTO tb_usuarios (username, email, password, status) VALUES (?, ?, ?, ?)";
    $stmt = $Objecto_conexao->prepare($sql);
    $stmt->execute([$username, $email, $hash_password, $status]);
    echo(json_encode(["logado" => true, "redirect" => "login.html", "MessageLogado" => "Usuário inserido com sucesso"]));

} catch (PDOException $erro) {
    echo(json_encode(["errorInsert" => true, "message" => "Erro ao inserir os dados: " . $erro->getMessage()]));
}
?>
