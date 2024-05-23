const container = document.querySelector(".container"),
        pwShowHide  = document.querySelectorAll(".showHidePw"),
        pwFields = document.querySelectorAll(".password");
        signUp = document.querySelectorAll(".signup-link");
        login = document.querySelectorAll(".login-link");

    // Código js para mostrar/esconder a senha e mudar o ícone
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type === "password"){
                    pwField.type = "text"; 

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                     pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            })
        })
    })

    document.addEventListener("DOMContentLoaded", function () {
        // Configurar evento de clique para ir para o cadastro
        const signupLink = document.querySelector(".signup-text");
        if (signupLink) {
            signupLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "cadastro.html"; // Verifique se o caminho está correto
            });
        }
    
        // Configurar evento de clique para ir para o login
        const loginLink = document.querySelector(".login-link");
        if (loginLink) {
            loginLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "login.html"; // Verifique se o caminho está correto
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Evento de clique para redirecionar para recuperação de senha
        const forgotPasswordLink = document.querySelector(".forgot-password-link");
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "recuperacao_senha.html"; // Verifique o caminho
            });
        }
    
        // Outros eventos para alternar entre login e cadastro
        const signupLink = document.querySelector(".signup-text");
        if (signupLink) {
            signupLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "cadastro.html";
            });
        }
    
        const loginLink = document.querySelector(".login-link");
        if (loginLink) {
            loginLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "login.html";
            });
        }
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const forgotPasswordLink = document.querySelector('.forgot-password-link');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = 'redefinir-senha.html'; // Verifique o nome da página de redefinição
            });
        }
    });

//Animação da barra de pesquisa
const searchBar = document.querySelector(".form .search input"),
searchBtn = document.querySelector(".form .search button");

searchBtn.onclick = ()=>{
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active")
}
