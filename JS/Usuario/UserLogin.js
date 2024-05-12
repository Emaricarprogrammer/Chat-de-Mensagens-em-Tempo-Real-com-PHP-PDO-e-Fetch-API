async function UserLogin() { // Define uma função assíncrona chamada UserLogin
    const UserEmail = email.value; // Obtém o valor do email do usuário do elemento HTML com o ID "email"
    const UserPassword = password.value; // Obtém o valor da senha do usuário do elemento HTML com o ID "password"

    try { // Início do bloco try para tratamento de erros
        const formData = new FormData(); // Cria um novo objeto FormData para enviar os dados do formulário

        // Adiciona os dados de email e senha ao objeto FormData
        formData.append("email", UserEmail);
        formData.append("password", UserPassword);

        const response = await fetch("../PHP/Usuario/UsuarioLogin.php", { // Envia uma solicitação fetch para o servidor
            method: "POST", // Define o método HTTP como POST
            body: formData // Define os dados do formulário como corpo da solicitação
        });

        const data = await response.json(); // Analisa a resposta da solicitação como JSON

        // Verifica se a autenticação foi bem-sucedida
        if (data.success) {
            sessionStorage.setItem("user", JSON.stringify(data.logado))
            sessionStorage.setItem("status", "online")
            window.location.href = data.redirect; // Redireciona para a página chat.html
        
        } else {
            console.log(data.message); // Registra uma mensagem de erro no console se a autenticação falhar
        }
    } catch (error) { // Captura e trata qualquer erro que ocorra durante o processo
        console.error("Houve um erro:", error); // Registra o erro no console do navegador
    }
}
