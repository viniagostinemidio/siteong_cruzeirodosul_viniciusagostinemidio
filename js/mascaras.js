// js/mascaras.js 

// As funções de máscara ficam privadas aqui
function mascaraCPF(e) {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, ''); 
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); 
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); 
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
    e.target.value = valor;
}

function mascaraTelefone(e) {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, ''); 
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2'); 
    e.target.value = valor;
}

function mascaraCEP(e) {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, ''); 
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2'); 
    e.target.value = valor;
}

// Esta é a função que exportamos
// Ela será chamada para "ligar" as máscaras
export function initMascaras() {
    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCEP = document.getElementById('cep');

    if(inputCPF) {
        inputCPF.addEventListener('input', mascaraCPF);
    }
    if(inputTelefone) {
        inputTelefone.addEventListener('input', mascaraTelefone);
    }
    if(inputCEP) {
        inputCEP.addEventListener('input', mascaraCEP);
    }
}