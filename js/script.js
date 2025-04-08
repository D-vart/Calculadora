// CALCULADORA SIMPLES - VERSÃO CORRIGIDA

// 1. Selecionar elementos
const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('button');

// 2. Variáveis para cálculos
let valorAtual = '0';
let valorAnterior = '';
let operacao = undefined;
let resetVisor = false;

// 3. Função para atualizar visor
function atualizarVisor() {
    let display = valorAtual;
    if (operacao !== undefined && valorAnterior !== '') {
        if (resetVisor) {
            display = `${valorAnterior} ${operacao}`;
        } else {
            display = `${valorAnterior} ${operacao} ${valorAtual}`;
        }
    }
    visor.value = display;
}

// 4. Adicionar números ao visor
botoes.forEach(botao => {
    if (botao.className === 'numero') {
        botao.addEventListener('click', () => {
            if (valorAtual === '0' || resetVisor) {
                valorAtual = '';
                resetVisor = false;
            }
            valorAtual += botao.innerText;
            atualizarVisor();
        });
    }
});

// 5. Função para limpar visor (C)
document.querySelector('.limpar').addEventListener('click', () => {
    valorAtual = '0';
    valorAnterior = '';
    operacao = undefined;
    atualizarVisor();
});

// 6. Operações básicas (+, -, *, /)
botoes.forEach(botao => {
    if (botao.className === 'operador') {
        botao.addEventListener('click', () => {
            if (valorAtual === '') return;
            
            if (valorAnterior !== '') {
                calcular();
            }
            
            operacao = botao.innerText;
            valorAnterior = valorAtual;
            resetVisor = true;
            atualizarVisor();
        });
    }
});

// 7. Função para calcular
function calcular() {
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const atual = parseFloat(valorAtual);

    if (isNaN(anterior) || isNaN(atual)) return;

    switch (operacao) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            resultado = anterior / atual;
            break;
        default:
            return;
    }

    valorAtual = resultado.toString();
    valorAnterior = '';
    operacao = undefined;
    resetVisor = true;
    atualizarVisor();
}

// 8. Botão de igual
document.querySelector('.igual').addEventListener('click', () => {
    if (operacao === undefined) return;
    calcular();
});
