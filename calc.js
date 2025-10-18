const display = document.getElementById('Display');
const keypad = document.querySelector('.calculator__keypad');
const allowedPattern = /^[0-9+\-*/%.()\s]*$/;

function appendValue(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastCharacter() {
    if (display.value === 'Error') {
        clearDisplay();
        return;
    }
    display.value = display.value.slice(0, -1);
}

function evaluateExpression(expression) {
    if (!expression.trim()) {
        return '';
    }

    if (!allowedPattern.test(expression)) {
        throw new Error('Expresión inválida');
    }

    // Reemplazar el símbolo de porcentaje por su equivalente decimal.
    const sanitizedExpression = expression.replace(/%/g, '/100');
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitizedExpression});`)();

    if (Number.isFinite(result)) {
        return result;
    }

    throw new Error('Resultado no válido');
}

function calculateResult() {
    try {
        const result = evaluateExpression(display.value);
        display.value = result === '' ? '' : String(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function handleButtonClick(event) {
    const button = event.target.closest('button');
    if (!button) {
        return;
    }

    const { action, value } = button.dataset;

    if (action === 'clear') {
        clearDisplay();
        return;
    }

    if (action === 'delete') {
        deleteLastCharacter();
        return;
    }

    if (action === 'equals') {
        calculateResult();
        return;
    }

    if (value) {
        appendValue(value);
    }
}

function handleKeyboardInput(event) {
    const { key } = event;

    if ((/^[0-9]$/.test(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key))) {
        event.preventDefault();
        appendValue(key);
        return;
    }

    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
        return;
    }

    if (key === 'Backspace') {
        event.preventDefault();
        deleteLastCharacter();
        return;
    }

    if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
}

keypad.addEventListener('click', handleButtonClick);
window.addEventListener('keydown', handleKeyboardInput);
