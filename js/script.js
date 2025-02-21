// Seleciona os elementos da calculadora
const display = document.getElementById('visor');
const buttons = document.querySelectorAll('button');

// Adiciona eventos aos botões
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

// Função para lidar com cliques nos botões
function handleButtonClick(value) {
    if (value === 'C') {
        // Limpa o visor
        display.value = '';
    } else if (value === '=') {
        // Calcula o resultado
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = 'Erro';
        }
    } else {
        // Adiciona o valor ao visor
        display.value += value;
    }
}
