// Define uma função assíncrona chamada IsAuth
async function IsAuth() {
    try {
        // Envia uma requisição GET para o servidor
        const response = await fetch("../PHP/Mensagem/MensagemInsert.php");

        // Converte a resposta do servidor para JSON e aguarda a conclusão
        const responseData = await response.json();

        // Verifica se a resposta indica que o usuário não está autenticado
        if (responseData.UserUnauth) {
            // Exibe uma mensagem de erro no elemento 'error_msg' com o texto de UserUnauth
            error_msg.innerText = responseData.UserMessge;

            // Exibe uma mensagem no console com a mensagem do usuário
            console.log(responseData.UserMessge);

            // Define um item no sessionStorage indicando que o usuário não está logado
            sessionStorage.setItem("IsLogged", "false");
            

            // Redireciona o usuário para a URL especificada em responseData.redirect
            window.location.href = responseData.redirect;
        }
    } catch (error) {
        // Exibe uma mensagem de erro no console em caso de exceção
        console.log(error);
    }
}

// Chama a função IsAuth imediatamente após a definição
IsAuth();
