// CALCULADORA SIMPLES - VERSÃO ATUALIZADA

const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('button');

let valorAtual = '0';
let valorAnterior = '';
let operacao = undefined;
let resetVisor = false;

function atualizarVisor() {
    let display = valorAtual;
    if (operacao !== undefined && valorAnterior !== '') {
        display = resetVisor
            ? `${valorAnterior} ${operacao}`
            : `${valorAnterior} ${operacao} ${valorAtual}`;
    }
    visor.value = display;
}

function inserirNumero(numero) {
    if (resetVisor || valorAtual === '0' || valorAtual === 'Erro') {
        valorAtual = '';
        resetVisor = false;
    }

    if (numero === '.' && valorAtual.includes('.')) {
        return;
    }

    valorAtual += numero;
    atualizarVisor();
}

function limpar() {
    valorAtual = '0';
    valorAnterior = '';
    operacao = undefined;
    resetVisor = false;
    atualizarVisor();
}

function calcular() {
    const anterior = parseFloat(valorAnterior);
    const atual = parseFloat(valorAtual);

    if (isNaN(anterior) || isNaN(atual)) return;

    let resultado;
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
            if (atual === 0) {
                resultado = 'Erro';
                break;
            }
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

botoes.forEach(botao => {
    if (botao.classList.contains('numero')) {
        botao.addEventListener('click', () => inserirNumero(botao.innerText));
    }

    if (botao.classList.contains('operador')) {
        botao.addEventListener('click', () => {
            if (valorAtual === '' || valorAtual === 'Erro') return;

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

document.querySelector('.limpar').addEventListener('click', limpar);

document.querySelector('.igual').addEventListener('click', () => {
    if (operacao === undefined || valorAtual === 'Erro') return;
    calcular();
});
