// js/formValidator.js
import { validaCPF } from './cpfValidator.js';

// Função de apoio para mostrar erro
function showError(input, message) {
    const errorSpan = input.nextElementSibling; // Pega o <span class="error-message">
    errorSpan.textContent = message;
    input.classList.add('invalid');
}

// Função de apoio para limpar erro
function clearError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = '';
    input.classList.remove('invalid');
}

// Validação em tempo real (enquanto digita)
function validateField(input) {
    let isValid = true;
    
    // 1. Checa se está vazio (regra 'required')
    if (input.validity.valueMissing) {
        showError(input, 'Este campo é obrigatório.');
        isValid = false;
    }
    // 2. Checa tipo (ex: email)
    else if (input.validity.typeMismatch) {
        showError(input, 'Por favor, insira um e-mail válido.');
        isValid = false;
    }
    // 3. Checa o pattern (ex: telefone)
    else if (input.validity.patternMismatch && input.id !== 'cpf') {
         showError(input, 'Formato incorreto. Ex: (00) 00000-0000');
         isValid = false;
    }
    // 4. Checagem CUSTOMIZADA para CPF
    else if (input.id === 'cpf') {
        if (!validaCPF(input.value)) {
            showError(input, 'CPF inválido. Verifique os dígitos.');
            isValid = false;
        } else {
            clearError(input);
        }
    }
    // 5. Se passou em tudo, limpa
    else {
        clearError(input);
    }
    
    return isValid;
}

// Função principal que exportamos
export function initFormValidation() {
    const form = document.getElementById('form-cadastro');
    if (!form) return; // Se não houver formulário na página, não faz nada

    const fieldsToValidate = form.querySelectorAll('input[required]');

    // Adiciona validação "on blur" (quando o usuário sai do campo)
    fieldsToValidate.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });

    // Validação final "on submit"
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio do formulário

        let isFormValid = true;
        
        // Valida todos os campos de uma vez
        fieldsToValidate.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            alert('Inscrição enviada com sucesso!');
            form.reset(); // Limpa o formulário
            fieldsToValidate.forEach(clearError); // Limpa as classes de erro
        } else {
            alert('Por favor, corrija os campos destacados em vermelho.');
        }
    });
}