const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = function(operator, n1, n2) {
    switch (operator) {
        case 'plus': 
            return add(n1, n2);
        case 'minus':
            return subtract(n1, n2);
        case 'multiply':
            return multiply(n1, n2);
        case 'divide':
            return divide(n1, n2);
    }
}

let operator = '';

let n1 = 0;

let n2 = 0;

const numberButtons = document.querySelectorAll('.numBtn');

const operatorButtons = document.querySelectorAll('.operator')

const display = document.getElementById('numDisplay');

const clearButton = document.getElementById('clear');

const equalsButton = document.getElementById('equals');


clearButton.addEventListener('click', () => {
    display.value = '';
    displayValue = [];
})

let displayValue = [];

for (const button of numberButtons) {
    button.addEventListener('click', function() {
        displayValue.push(button.textContent);
        display.value = displayValue.join('')

    })
}

for (const button of operatorButtons) {
    button.addEventListener('click', function() {
        operator = button.id;
        n1 = displayValue.join('');
        display.value = '';
        displayValue = [];
    })
}


equalsButton.addEventListener('click', () => {
    n2 = displayValue.join('');
    display.value = operate(operator, n1, n2);
})