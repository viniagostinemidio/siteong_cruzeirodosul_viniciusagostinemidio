// js/navigation.js

// Lógica do Menu Hambúrguer (existente)
function toggleMainMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

//Lógica do Submenu Dropdown para Mobile ---
function initDropdownMobile() {
    const menuToggle = document.getElementById('menu-toggle'); // Usamos para checar se é mobile
    if (!menuToggle) return;

    const dropdownToggles = document.querySelectorAll('#main-nav .dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            
            // 1. Checa se o menu hamburguer está visível (indicando modo mobile)
            const isMobile = window.getComputedStyle(menuToggle).display !== 'none';

            if (isMobile) {
                // 2. Impede a navegação do link principal (ex: projetos.html)
                e.preventDefault();
                
                // 3. Impede que o clique "borbulhe" e seja pego pelo router.js
                e.stopPropagation(); 

                const dropdownLi = toggle.parentElement; // O <li>.dropdown

                // 4. Fecha outros dropdowns que possam estar abertos
                const allOpenDropdowns = document.querySelectorAll('#main-nav .dropdown.open');
                allOpenDropdowns.forEach(d => {
                    if (d !== dropdownLi) {
                        d.classList.remove('open');
                    }
                });

                // 5. Abre/Fecha o dropdown atual
                dropdownLi.classList.toggle('open');
            }
            
            // Se não for mobile (desktop), o script não faz nada.
            // O clique não é impedido (sem preventDefault) e
            // o router.js vai capturá-lo e navegar,
            // que é o comportamento esperado no desktop.
        });
    });
}

// Função principal que será exportada
export function initHamburgerMenu() {
    toggleMainMenu();
    initDropdownMobile();
}