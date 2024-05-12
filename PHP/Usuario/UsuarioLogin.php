<?php
session_start();
include_once "../db/Conexao.php";

$email = $_POST['email'];
$password = $_POST['password'];


try {
    global $Objecto_conexao;
    $Sql_query_string = "SELECT * FROM tb_usuarios WHERE email = ?";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user;
        $_SESSION['logado'] = true;
        $_SESSION['nome'] = $user['username'];
        $_SESSION['UserId'] = $user['id_usuario'];
        $_SESSION['email'] = $user['email'];
        $Sql_update_status = "UPDATE tb_usuarios SET status= ?";
        $stmt = $Objecto_conexao->prepare($Sql_update_status);
        $stmt->execute(["online"]);


        echo json_encode(["success" => true, "redirect" => "chat.html", "logado" => $_SESSION['logado']]);
    
        http_response_code(200); // OK
    } else {
        echo json_encode(["success" => false, "message" => "Credenciais inválidas"]);
        http_response_code(401); // Unauthorized
    }
} catch (PDOException $erro) {
    echo json_encode(["success" => false, "message" => "Erro ao fazer login: " . $erro->getMessage()]);
    http_response_code(500); // Internal Server Error
}
?>
