<?php
session_start();
include_once "../db/Conexao.php";

try {
    global $Objecto_conexao;
    $Sql_query_string = "SELECT tb_usuarios.*, tb_mensagens.* from tb_usuarios INNER JOIN tb_mensagens on tb_usuarios.id_usuario = tb_mensagens.id_usuario";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    $stmt->execute();
    $Resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(!$Resultado){
        echo json_encode(["success" => false, "message" => "Sem mensagens " ]);

    }
    
    // Montar os resultados em um array associativo
    $mensagens = [];
    foreach ($Resultado as $mensagem) {
        $mensagens[] = [
            'nome' => $mensagem['username'],
            'Mensagens' => $mensagem['mensagem']
        ];
    }
    
    // Converter o array associativo em JSON
    $Resultado_json = json_encode($mensagens);
    
    // Enviar a resposta JSON
    header('Content-Type: application/json');
    echo $Resultado_json;
} catch (PDOException $erro) {
    // Tratar erros
    echo json_encode(["success" => false, "message" => "Erro ao ler usuários: " . $erro->getMessage()]);
}
?>
