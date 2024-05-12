async function ReadMessages() { // Define uma função assíncrona chamada ReadMessages
    try { // Início do bloco try para tratamento de erros
        const response = await fetch("../PHP/Mensagem/MensagemReadAll.php"); // Envia uma solicitação para obter todas as mensagens
        const data = await response.json(); // Converte a resposta em formato JSON
        
        sms.innerHTML = ''; // Limpa o conteúdo atual do elemento HTML com o ID "sms"

        // Itera sobre cada mensagem no array de mensagens retornado pelo servidor
        data.forEach(message => {
            const Mensagem = document.createElement('div'); // Cria um novo elemento <div> para exibir a mensagem
            Mensagem.textContent = `${message.nome}: ${message.Mensagens}`; // Define o conteúdo de texto do elemento para exibir a mensagem
            sms.appendChild(Mensagem); // Adiciona o elemento da mensagem à interface do usuário
        });
    } catch (error) { // Captura e trata qualquer erro que ocorra durante o processo
        console.error('Erro ao buscar mensagens:', error); // Registra o erro no console do navegador
    }
}

ReadMessages(); // Chama a função inicialmente para exibir as mensagens existentes quando a página for carregada

setInterval(ReadMessages, 5000); // Define um intervalo de tempo para chamar a função ReadMessages periodicamente
