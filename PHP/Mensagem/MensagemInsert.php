<?php
session_start();
include_once "../db/Conexao.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_SESSION['user'])) {

    exit(json_encode(["success" => false, "message" => "Usuário não autenticado"]));
}

if (!isset($_POST['mensagem'])) {

    exit(json_encode(["success" => false, "message" => "Preencha todos os campos"]));
}

$mensagem = $_POST['mensagem'];
$id_usuario = $_SESSION['user']['id_usuario'];

try {
    global $Objecto_conexao;
    $Sql_query_string = "INSERT INTO tb_mensagens (mensagem, id_usuario) VALUES (?, ?)";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    $stmt->execute([$mensagem, $id_usuario]);
    header('Content-Type: application/json');
    exit(json_encode(["success" => true, "message" => "Mensagem enviada com sucesso"]));
} catch (PDOException $erro) {
    exit(json_encode(["success" => false, "message" => "Erro ao enviar a mensagem: " . $erro->getMessage()]));
}

?>
