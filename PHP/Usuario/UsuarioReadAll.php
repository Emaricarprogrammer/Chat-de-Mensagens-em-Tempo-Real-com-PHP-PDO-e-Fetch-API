<?php
session_start();
include_once "../db/Conexao.php";

try {
    global $Objecto_conexao;
    $Sql_query_string = "SELECT * FROM tb_usuarios";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    $stmt->execute();
    $Resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Montar os resultados em um array associativo
    $usuarios = [];
    foreach ($Resultado as $usuario) {
        $usuarios[] = [
            'nome' => $usuario['username'],
            'email' => $usuario['email']
        ];
    }
    
    // Converter o array associativo em JSON
    $Resultado_json = json_encode($usuarios);
    
    // Enviar a resposta JSON
    header('Content-Type: application/json');
    echo $Resultado_json;
} catch (PDOException $erro) {
    // Tratar erros
    echo json_encode(["success" => false, "message" => "Erro ao ler usuários: " . $erro->getMessage()]);
}
?>
