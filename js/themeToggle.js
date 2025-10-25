// js/themeToggle.js

// Esta lógica RODA IMEDIATAMENTE quando o script é carregado,
// antes mesmo da página ser desenhada. Isso previne o "flash" de
// tema claro se o usuário já tiver escolhido o escuro.
const html = document.documentElement; // A tag <html>
const savedTheme = localStorage.getItem('theme'); // Pega o tema salvo

// 1. Verifica se há um tema salvo no localStorage
if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
} else if (savedTheme === 'light') {
    html.classList.remove('dark-mode');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // 2. Se não há nada salvo, verifica a PREFERÊNCIA DO SISTEMA
    html.classList.add('dark-mode');
}
// (Se não cair em nada, o padrão é 'light' e nenhuma classe é adicionada)


// Esta função exportada será chamada pelo app.js 
// para "ligar" o botão DEPOIS que a página carregar.
export function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return; // Se o botão não existir, não faz nada

    // Atualiza o ícone do botão com base no tema atual
    if (html.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '☀️'; // Sol (se está escuro, mostra opção de claro)
        toggleButton.setAttribute('aria-label', 'Ativar modo claro');
    } else {
        toggleButton.innerHTML = '🌙'; // Lua (se está claro, mostra opção de escuro)
        toggleButton.setAttribute('aria-label', 'Ativar modo escuro');
    }

    // Adiciona o "ouvinte" de clique no botão
    toggleButton.addEventListener('click', () => {
        // 1. Troca a classe na tag <html>
        html.classList.toggle('dark-mode');
        
        // 2. Salva a nova preferência e atualiza o botão
        if (html.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark'); // Salva 'dark'
            toggleButton.innerHTML = '☀️';
            toggleButton.setAttribute('aria-label', 'Ativar modo claro');
        } else {
            localStorage.setItem('theme', 'light'); // Salva 'light'
            toggleButton.innerHTML = '🌙';
            toggleButton.setAttribute('aria-label', 'Ativar modo escuro');
        }
    });
}