// Seleciona os elementos da calculadora
var display = document.getElementById('visor');
var buttons = document.getElementsByTagName('button');

// Adiciona eventos aos botões
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        handleButtonClick(this.textContent);
    };
}

// Função para lidar com cliques nos botões
function handleButtonClick(value) {
    if (value === 'C') {
        // Limpa o visor
        display.value = '';
    } else if (value === '=') {
        // Calcula o resultado
        var result;
        try {
            result = calculate(display.value);
            display.value = result;
        } catch (error) {
            display.value = 'Erro';
        }
    } else {
        // Adiciona o valor ao visor
        display.value += value;
    }
}

// Função melhorada para calcular a expressão
function calculate(expression) {
    // Remove espaços e valida a expressão
    expression = expression.replace(/\s+/g, '');
    if (!/^[\d+\-*/().]+$/.test(expression)) {
        throw new Error('Expressão inválida');
    }

    // Usa eval para calcular a expressão de forma segura
    return Function('"use strict";return (' + expression + ')')();
}
