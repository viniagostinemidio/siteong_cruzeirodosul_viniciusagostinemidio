// js/app.js

// 1. Importa todos os módulos necessários
import { initThemeToggle } from './themeToggle.js';
import { initHamburgerMenu } from './navigation.js';
import { initRouter } from './router.js';

// 2. Roda UMA VEZ quando o HTML estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicia todas as funcionalidades
    initThemeToggle();
    initHamburgerMenu();
    initRouter();
});