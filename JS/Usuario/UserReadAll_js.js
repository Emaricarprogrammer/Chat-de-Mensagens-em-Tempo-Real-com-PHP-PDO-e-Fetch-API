async function ReadUsers() {
    try {
        var resposta = await fetch("../PHP/Usuario/UsuarioReadAll.php");
        var data = await resposta.text(); // Obter resposta como texto
        console.log(data); // Exibir a resposta no console

        // Parse da resposta para JSON
        var users = JSON.parse(data);

        // Limpa a mensagem
        nome.innerText = '';

        // Iterar sobre cada usuário e exibir o nome de cada um
        users.forEach(function(usuario) {
            var nomeUser = usuario.nome;
            var emailUser = usuario.email
            nome.innerText += nomeUser + '\n';
            email.innerText += emailUser + '\n'
            console.log(nome);
        });
    } catch (erro) {
        console.error('Erro:', erro);
    }
    
}

ReadUsers()