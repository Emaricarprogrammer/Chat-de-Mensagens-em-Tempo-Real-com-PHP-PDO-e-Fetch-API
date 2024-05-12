async function MessageInsert() { // Define uma função assíncrona chamada MessageInsert
    const Message = mensagem.value; // Obtém o valor da mensagem do elemento HTML com o ID "mensagem"

    try { // Início do bloco try para tratamento de erros
        const formData = new FormData(); // Cria um novo objeto FormData para enviar os dados do formulário

        // Adiciona a mensagem ao objeto FormData
        formData.append("mensagem", Message);

        const cabecalho = { // Define o cabeçalho da solicitação fetch
            method: "POST", // Define o método HTTP como POST
            body: formData // Define os dados do formulário como corpo da solicitação
        };

        // Envia uma solicitação fetch para o servidor para inserir a mensagem
        const response = await fetch("../PHP/Mensagem/MensagemInsert.php", cabecalho);
        
        // Verifica se a resposta da solicitação está OK
        if (!response.ok) {
            throw new Error("Erro ao enviar esta mensagem"); // Lança um erro se a resposta não estiver OK
        }

        // Converte a resposta em formato JSON
        const responseData = await response.json();
        
        // Exibe o ID da mensagem no console
        console.log(responseData.messageid);
        
        // Verifica se a inserção da mensagem foi bem-sucedida
        if (responseData.success) {
            console.log("Mensagem enviada com sucesso"); // Registra uma mensagem de sucesso no console
        } else {
            // Lança um erro com a mensagem de erro recebida do servidor, ou uma mensagem padrão se não houver mensagem de erro
            throw new Error(responseData.message || 'Erro ao enviar esta mensagem');
        }
    } catch (error) { // Captura e trata qualquer erro que ocorra durante o processo
        console.error("Houve um erro: ", error); // Registra o erro no console do navegador
    }
}
