<?php
// Inicia uma sessão
session_start();

// Inclui o arquivo de conexão com o banco de dados
include_once "../db/Conexao.php";

// Verifica se o usuário está autenticado
if (!isset($_SESSION['logado'])) {
    // Se o usuário não estiver autenticado, envia uma resposta JSON com a mensagem de erro e redirecionamento
    exit(json_encode([
        "UserUnauth" => true,
        "UserMessge" => "Usuário não autenticado",
        "redirect" => "login.html"
    ]));
}

// Verifica se a mensagem foi enviada
if (!isset($_POST['mensagem'])) {
    // Se a mensagem não foi enviada, envia uma resposta JSON com a mensagem de erro
    exit(json_encode([
        "EmptyMessage" => true,
        "MessageEmpty" => "Enviar uma mensagem"
    ]));
}

// Obtém a mensagem do POST e o ID do usuário da sessão, removendo espaços em branco extras da mensagem
$mensagem = trim($_POST['mensagem']);
$id_usuario = $_SESSION['user']['id_usuario'];

try {
    // Acesso ao objeto de conexão global
    global $Objecto_conexao;

    // Preparação da consulta SQL para inserir a mensagem no banco de dados
    $Sql_query_string = "INSERT INTO tb_mensagens (mensagem, id_usuario) VALUES (?, ?)";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    
    // Executa a consulta com os parâmetros mensagem e ID do usuário
    $stmt->execute([$mensagem, $id_usuario]);

    // Envia uma resposta JSON de sucesso
    exit(json_encode([
        "Messagesuccess" => true,
        "MessageSent" => "Mensagem enviada com sucesso",
        "UserLogado" => true,
        "idUser"  => $id_usuario,
    ]));
} catch (PDOException $erro) {
    // Se houver um erro na execução da consulta, envia uma resposta JSON com a mensagem de erro
    exit(json_encode([
        "MessageError" => true,
        "MessageErrorMsg" => "Erro ao enviar a mensagem: " . $erro->getMessage()
    ]));
}
?>
