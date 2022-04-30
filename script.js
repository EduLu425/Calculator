const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
var operatorCounter = 0;
var equalCounter = 0;
var divZeroCounter = 0;

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
    n1 = 0;
    n2 = 0;
    operatorCounter = 0;
    equalCounter = 0;
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
        if (operatorCounter >= 1 && equalCounter === 0) {
            n2 = parseInt(displayValue.join(''));
            if (operator === 'divide' && n2 === 0) {
                display.value = 'ERROR';
                n1 = NaN;
            }
            else {
                display.value = operate(operator, n1, n2)
                n1 = parseInt(display.value);
                displayValue = [];
            }

        }
        else if (equalCounter === 1) {
            equalCounter = 0;
            display.value = '';
            displayValue = [];
            return
        }
        else {            
            n1 = parseInt(displayValue.join(''));
            display.value = '';
            displayValue = [];
            operatorCounter++;
        }

    })
}



equalsButton.addEventListener('click', () => {
    n2 = parseInt(displayValue.join(''));
    equalCounter = 1;
    if (operator === 'divide' && n2 === 0) {
        display.value = 'ERROR';
    }
    else {
        display.value = operate(operator, n1, n2);
        n1 = parseInt(display.value);
        n2 = 0;
    }

})