// Simule o ID do usuário atual (substitua por sua lógica real de obtenção do ID do usuário)
let currentUserId = sessionStorage.getItem("currentIDUser");

async function ReadMessages() {
    try {
        const response = await fetch("../PHP/Mensagem/MensagemReadAll.php");

        if (!response.ok) {
            throw new Error("Erro ao buscar mensagens do servidor");
        }

        const data = await response.json();

        const chatBox = document.querySelector('.chat-box'); // Obtém o contêiner de mensagens pela classe

        if (data.Message) {
            chatBox.innerHTML = `<div>${data.NoMessage}</div>`; // Exibe a mensagem informativa
            return;
        }

        chatBox.innerHTML = ''; // Limpa o conteúdo atual do contêiner de mensagens

        data.forEach(message => {

            const chatDiv = document.createElement('div');
            chatDiv.classList.add('chat'); // Classe base para estilos comuns

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');

            detailsDiv.innerHTML = `
                <p>${message.nome}: ${message.Mensagens}</p>
            `;

            if (parseInt(message.senderId) == currentUserId) {
                chatDiv.classList.add('outgoing'); // Estilos para mensagens enviadas pelo usuário atual
            } else {
                chatDiv.classList.add('incoming'); // Estilos para mensagens recebidas
            }

          

            chatDiv.appendChild(detailsDiv);
            chatBox.appendChild(chatDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
    }
}

ReadMessages(); // Chama a função inicialmente para exibir as mensagens existentes quando a página for carregada

setInterval(ReadMessages, 5000); // Define um intervalo de tempo para chamar a função ReadMessages periodicamente
