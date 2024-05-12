// Verificar autenticação antes do carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
    // Função para verificar autenticação
    function IsAuth() {
        // Verificar se há dados de sessão do usuário
        const user = sessionStorage.getItem('user'); // ou localStorage.getItem('user'); se estiver usando localStorage
        console.log(user)

        if(!user){
            window.location = "../HTML/login.html";
        }

        // Se o usuário não estiver autenticado, redirecionar para a página de login
        
    }

    // Chamar a função de verificação de autenticação
    IsAuth();
});
