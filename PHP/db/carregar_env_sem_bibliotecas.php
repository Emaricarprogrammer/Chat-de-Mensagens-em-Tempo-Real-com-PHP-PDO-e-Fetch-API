<?php
// env_loader.php

function carregarEnv($caminho)
{
    // Verifica se o arquivo .env existe
    if (!file_exists($caminho)) {
        throw new Exception('.env não encontrado');
    }

    // Lê as linhas do arquivo .env
    $linhas = file($caminho, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Itera sobre as linhas e define as variáveis de ambiente
    foreach ($linhas as $linha) {
        if (strpos($linha, '=') !== false) {
            list($chave, $valor) = explode('=', $linha, 2);
            $chave = trim($chave);
            $valor = trim($valor);
            putenv("$chave=$valor");
        }
    }
}


?>