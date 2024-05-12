async function CreateUser() { // Define uma função assíncrona chamada CreateUser
    const UserName = nome.value; // Obtém o valor do nome do usuário do elemento HTML com o ID "nome"
    const UserEmail = email.value; // Obtém o valor do email do usuário do elemento HTML com o ID "email"
    const UserPassword = password.value; // Obtém o valor da senha do usuário do elemento HTML com o ID "password"
    const UserStatus = status.value; // Obtém o valor do status do usuário do elemento HTML com o ID "status"

    console.log(UserName, UserEmail, UserPassword, UserStatus); // Registra os valores obtidos no console para depuração

    try { // Início do bloco try para tratamento de erros
        const UserForm = new FormData(); // Cria um novo objeto FormData para enviar os dados do formulário

        // Adiciona os dados do usuário ao objeto FormData
        UserForm.append("nome", UserName);
        UserForm.append("email", UserEmail);
        UserForm.append("password", UserPassword);
        UserForm.append("status", UserStatus);

        const cabecalho = { // Define o cabeçalho da solicitação fetch
            method: 'POST', // Define o método HTTP como POST
            body: UserForm // Define os dados do formulário como corpo da solicitação
        };

        // Envia uma solicitação fetch para o servidor para criar um novo usuário
        const response = await fetch("../PHP/Usuario/UsuarioInsert.php", cabecalho);
        
        // Verifica se a resposta da solicitação está OK
        if (!response.ok) {
            throw new Error('Erro ao criar este usuário'); // Lança um erro se a resposta não estiver OK
        }

        // Verifica o conteúdo da resposta
        const responseData = await response.text();
        
        // Verifica se a resposta contém a mensagem "Usuário inserido com sucesso"
        if (responseData.includes("Usuário inserido com sucesso")) {
            console.log("Usuário criado com sucesso"); // Registra uma mensagem de sucesso no console
        } else {
            // Lança um erro se a resposta não contiver a mensagem esperada
            throw new Error('Erro ao criar este usuário');
        }
    } catch (error) { // Captura e trata qualquer erro que ocorra durante o processo
        console.error("Houve um erro: ", error); // Registra o erro no console do navegador
    }
}
