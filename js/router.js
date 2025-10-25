// js/router.js
import { initMascaras } from './mascaras.js';
import { initFormValidation } from './formValidator.js';


export function initRouter() {

    // 1. Movemos a 'mainContent' para dentro
    const mainContent = document.getElementById('main-content');
    // Se não achar o main-content (ex: erro no HTML), ele para.
    if (!mainContent) return; 

    // 2. Movemos a 'loadPage' para dentro
    async function loadPage(href) {
        try {
            const response = await fetch(href); // 1. Busca o arquivo HTML
            if (!response.ok) throw new Error('Página não encontrada');
            
            const text = await response.text(); // 2. Pega o texto do HTML
            
            // 3. Usa um "truque" para converter o texto em DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            // 4. Pega o conteúdo do <main id="main-content"> do arquivo buscado
            const newContent = doc.querySelector('#main-content').innerHTML;
            
            // 5. Atualiza o título da aba
            document.title = doc.title; 
            
            // 6. Injeta o novo conteúdo no <main> da página atual
            mainContent.innerHTML = newContent;

            // 7. Roda os scripts específicos (ela também está no escopo)
            runPageScripts(href);

        } catch (err) {
            console.error('Erro ao carregar página:', err);
            mainContent.innerHTML = '<h1>Erro 404 - Página não encontrada</h1>';
        }
    }

    // 3. Movemos a 'runPageScripts' para dentro
    function runPageScripts(href) {
        // As importações (initMascaras, etc) são acessíveis aqui
        if (href.includes('cadastro')) {
            initMascaras();
            initFormValidation();
        }
    }


    // 4. AGORA OS EVENT LISTENERS VÃO ACHAR AS FUNÇÕES
    
    // Lida com cliques nos links de navegação
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a.nav-link');
        
        if (link) {
            
            // --- VERIFICAÇÃO IMPORTANTE ---
            // Se o link clicado for o PAI de um dropdown (no mobile),
            // o navigation.js já tratou disso e deu stopPropagation.
            // Então, se o clique chegou até aqui, é um link de navegação "real".
            
            e.preventDefault(); // Impede o recarregamento da página
            const href = link.getAttribute('href');
            
            // Atualiza a URL na barra do navegador
            history.pushState(null, '', href); 
            
            // Carrega o conteúdo da nova página 
            loadPage(href);
            
            // CORREÇÃO PARA FECHAR O MENU 
            const menuToggle = document.getElementById('menu-toggle');
            const mainNav = document.getElementById('main-nav');
            
            if (mainNav && menuToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Procura e fecha QUALQUER dropdown que esteja aberto
            const openDropdowns = document.querySelectorAll('#main-nav .dropdown.open');
            openDropdowns.forEach(d => {
                d.classList.remove('open');
            });
        }
    });

    // Lida com os botões "Voltar" e "Avançar" do navegador
    window.addEventListener('popstate', () => {

        loadPage(location.pathname);
    });

    // Roda os scripts da página atual no primeiro carregamento

    runPageScripts(location.pathname);
}