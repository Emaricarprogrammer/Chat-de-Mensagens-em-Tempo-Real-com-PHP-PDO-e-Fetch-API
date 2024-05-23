<?php
// Inicia a sessão para manter as informações do usuário logado
session_start();

// Inclui o arquivo de conexão com o banco de dados
include_once "../db/Conexao.php";

try {
    // Obtém o email e a senha enviados por meio do método POST
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    // Verifica se email e password não são nulos
    if (!$email || !$password) {
        echo json_encode(["unsuccessLogin" => false, "MessageLogin" => "Email e senha são obrigatórios"]);
        http_response_code(400); // Código de resposta HTTP 400 (Bad Request)
        exit();
    }

    // Prepara a consulta SQL para buscar o usuário pelo email fornecido
    $sql = "SELECT * FROM tb_usuarios WHERE email = ?";
    $stmt = $Objecto_conexao->prepare($sql);
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica se o usuário existe e se a senha fornecida corresponde à senha armazenada no banco de dados
    if ($user && password_verify($password, $user['password'])) {
        // Define as variáveis de sessão para o usuário logado
        $_SESSION['logado'] = true;
        $_SESSION['user'] = $user;
        $_SESSION['nome'] = $user['username']; // Substitua 'username' pelo campo correto do seu banco de dados
        $_SESSION['email'] = $user['email'];
        
        // Atualiza o status do usuário para "online" no banco de dados
        $sql_update_status = "UPDATE tb_usuarios SET status = ? WHERE id_usuario = ?";
        $stmt = $Objecto_conexao->prepare($sql_update_status);
        $stmt->execute(["online", $user['id_usuario']]);

        // Responde com um JSON indicando sucesso, redirecionamento para a página de chat e dados do usuário
        echo json_encode(["successLogin" => true, "redirect" => "chat.html", "nome" => $_SESSION['nome'], "email" => $_SESSION['email']]);
        http_response_code(200); // Define o código de resposta HTTP como 200 (OK)
    } else {
        // Se as credenciais forem inválidas, responde com um JSON indicando falha
        echo json_encode(["unsuccessLogin" => false, "MessageLogin" => "Credenciais inválidas"]);
        http_response_code(401); // Define o código de resposta HTTP como 401 (Não autorizado)
    }
} catch (PDOException $erro) {
    // Se ocorrer um erro durante o processo, responde com um JSON indicando falha e a mensagem de erro
    echo json_encode(["ErrorLogin" => false, "message" => "Erro ao fazer login: " . $erro->getMessage()]);
    http_response_code(500); // Define o código de resposta HTTP como 500 (Erro interno do servidor)
}
?>
