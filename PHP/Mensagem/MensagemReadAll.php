<?php
session_start();
include_once "../db/Conexao.php";

try {
    global $Objecto_conexao;
    $Sql_query_string = "SELECT tb_usuarios.*, tb_mensagens.* from tb_usuarios INNER JOIN tb_mensagens on tb_usuarios.id_usuario = tb_mensagens.id_usuario order by tb_mensagens.id_mensagem";
    $stmt = $Objecto_conexao->prepare($Sql_query_string);
    $stmt->execute();
    $Resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $NumRows = $stmt->rowCount();// Verificar se há resultados
    if($NumRows == 0){
        exit( json_encode(["Message" => true, "NoMessage" => "Sem mensagens ainda" ]));

    }
    
    // Montar os resultados em um array associativo
    $mensagens = [];
    foreach ($Resultado as $mensagem) {
        $mensagens[] = [
            'nome' => $mensagem['username'],
            'Mensagens' => $mensagem['mensagem'],
            'id'  => $mensagem['id_mensagem'],
            'senderId' => $mensagem['id_usuario'] // ID do remetente da mensagem

        ];
    }
    
    // Converter o array associativo em JSON
    $Resultado_json = json_encode($mensagens);
    
    // Enviar a resposta JSON
    header('Content-Type: application/json');
    exit( $Resultado_json);
} catch (PDOException $erro) {
    // Tratar erros
    exit( json_encode(["Messagerror" => true, "message" => "Erro ao ler usuários: " . $erro->getMessage()]));
}
?>
