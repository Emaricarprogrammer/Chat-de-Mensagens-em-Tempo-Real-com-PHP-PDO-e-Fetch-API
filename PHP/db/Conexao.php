<?php
//Conexão ao db
session_start();
require_once './carregar_env_sem_bibliotecas.php';
carregarEnv(__DIR__ . '/.env');

$host = getenv('DB_HOST');
$db_name = getenv('DB_NAME');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');

/*
$host = "localhost";
$db_name = "db_chat_app";
$username = "root";
$password = "";*/

try {
    $Obejcto_conexao = new \PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    echo "Conectado com sucesso";
} catch(PDOException $error) {
    echo "Houve um erro na conexão: " . $error->getMessage();
}
?>
