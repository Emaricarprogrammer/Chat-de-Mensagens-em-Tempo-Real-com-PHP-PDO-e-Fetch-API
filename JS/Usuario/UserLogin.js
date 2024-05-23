async function UserLogin() {
    // Obtém o valor do campo de entrada com o ID 'email'
    const UserEmail = document.getElementById('email').value;
    
    // Obtém o valor do campo de entrada com o ID 'password'
    const UserPassword = document.getElementById('password').value;

    try {
        // Cria uma nova instância de FormData para armazenar os dados do formulário
        const formData = new FormData();
        
        // Adiciona o valor do email ao formData
        formData.append("email", UserEmail);
        
        // Adiciona o valor da senha ao formData
        formData.append("password", UserPassword);

        // Envia uma requisição POST para o script PHP no servidor
        const response = await fetch("../PHP/Usuario/UsuarioLogin.php", {
            method: "POST", // Define o método da requisição como POST
            body: formData  // Define o corpo da requisição com os dados do formulário
        });

        // Converte a resposta do servidor para JSON
        const data = await response.json();
        
        // Exibe a resposta do servidor no console
       // console.log('Server response:', data);

        // Verifica se o login foi bem-sucedido
        if (data.successLogin) {
            /*
            // Armazena a informação de login bem-sucedido no sessionStorage
            sessionStorage.setItem("logado", "true");
            
            // Armazena o nome do usuário no sessionStorage
            sessionStorage.setItem("UserName", data.nome);
            
            // Armazena o email do usuário no sessionStorage
            sessionStorage.setItem("UserEmail", data.email);
            
            // Armazena o status do usuário como 'online' no sessionStorage
            sessionStorage.setItem("status", "online");
*/
            // Redireciona o usuário para a página de chat se o login for bem-sucedido
            window.location.href = data.redirect;
        } else {
            // Exibe uma mensagem de erro caso o login não seja bem-sucedido
            senha_error.innerText = data.MessageLogin;
            
            // Exibe a mensagem de erro no console
            //console.log(data.MessageLogin);
        }
    } catch (error) {
        // Exibe uma mensagem de erro no console caso ocorra uma exceção
        console.error("Houve um erro:", error);
    }
}
