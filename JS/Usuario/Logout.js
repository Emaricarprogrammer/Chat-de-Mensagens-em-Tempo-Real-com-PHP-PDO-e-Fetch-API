async function Logout() {
    try {
        const response = await fetch("../PHP/Usuario/UsuarioLogout.php", {
            method: "GET" // Ou "POST", dependendo da configuração do servidor
        });

        if (response.ok) {
            // Limpa os dados de sessão no cliente
            sessionStorage.clear();
            
            // Redireciona o usuário para a página de login (ou qualquer outra página desejada)
            window.location.href = "login.html";
        } else {
            console.error("Erro ao fazer logout:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}
