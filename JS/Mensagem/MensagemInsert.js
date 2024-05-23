async function MessageInsert() {
    // Obtém o valor da mensagem do elemento 'mensagem' e remove espaços em branco no início e no final
    const message = mensagem.value.trim();

    try {
        // Verifica se a mensagem está vazia
        if (!message) {
            // Exibe uma mensagem no console se a mensagem estiver vazia
            console.log("Enviar uma mensagem");
            // Interrompe o processo se a mensagem estiver vazia
            return;
        }

        // Cria uma nova instância de FormData para armazenar a mensagem
        const formData = new FormData();
        // Adiciona a mensagem ao formData
        formData.append("mensagem", message);

        // Define as opções da requisição, incluindo o método e o corpo da requisição
        const options = {
            method: "POST", // Define o método da requisição como POST
            body: formData  // Define o corpo da requisição com os dados do formulário
        };

        // Envia uma requisição POST para o script PHP no servidor
        const response = await fetch("../PHP/Mensagem/MensagemInsert.php", options);

        // Verifica se a resposta não está OK (código de status fora do intervalo 200-299)
        if (!response.ok) {
            // Lança um erro se a resposta não estiver OK
            throw new Error("Erro ao enviar esta mensagem");
        }

        // Converte a resposta do servidor para JSON e aguarda a conclusão
        const responseData = await response.json();
        const iduser = responseData.idUser
        sessionStorage.setItem("currentIDUser", iduser)
        
        
        // Exibe a resposta JSON no console para inspeção
        //console.log(responseData);
       //console.log(responseData.nome)
        // Verifica se a mensagem foi enviada com sucesso
        if (responseData.Messagesuccess) {
            
            // Exibe uma mensagem de sucesso no console
            //console.log(responseData.MessageSent);
        } else {
            // Define uma mensagem de erro padrão ou usa a mensagem de erro do servidor
            const errorMessage = responseData.MessageError || "Erro ao enviar esta mensagem";
            // Lança um erro com a mensagem de erro apropriada
            throw new Error(errorMessage);
        }
    } catch (error) {
        // Exibe uma mensagem de erro no console em caso de exceção
        console.error("Houve um erro: ", error);
    }
}
