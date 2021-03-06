const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
var operatorCounter = 0; /*Tracks if an operator button has already been pressed */ 
var equalCounter = 0;
var divZeroCounter = 0; /* Tracks if user has tried to divde by zero */

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

const negativeButton = document.getElementById('negative');

const percentButton = document.getElementById('percent');

const decimalButton = document.getElementById('decimal');

const backButton = document.getElementById('back');

negativeButton.addEventListener('click', function(){
    display.value *= -1;
    displayValue = ((display.value).toString()).split('');
})

percentButton.addEventListener('click', function() {
    display.value *= 0.01;
    displayValue = ((display.value).toString()).split('');
})

decimalButton.addEventListener('click', function() {
    if (displayValue.includes('.')) {
        return;
    }
    else if (display.value % 1 === 0) {
        displayValue = (((display.value).toString()).split(''));
        displayValue.push('.');
        display.value = displayValue.join('');
    }
})

backButton.addEventListener('click', function() {
        displayValue.pop();
        display.value = displayValue.join('');
})

clearButton.addEventListener('click', () => {
    display.value = '';
    displayValue = [];
    n1 = 0;
    n2 = 0;
    operatorCounter = 0;
    equalCounter = 0;
    divZeroCounter = 0;
})

let displayValue = [];

for (const button of numberButtons) {
    button.addEventListener('click', function() {
        displayValue.push(button.textContent);
        display.value = displayValue.join('')

    })
}
/* Operator buttons store display value as n1 when pressed the first time. Strings together operations if a button has been pressed once */ 

for (const button of operatorButtons) {
    button.addEventListener('click', function() {
        operator = button.id;  
        if (operatorCounter >= 1 && equalCounter === 0) {
            n2 = parseFloat(displayValue.join(''));
            if (operator === 'divide' && n2 === 0) {
                display.value = 'ERROR';
                divZeroCounter++;
            }
            else if (divZeroCounter >= 1) {
                display.value = 'NaN';
            }
            else {
                display.value = operate(operator, n1, n2)
                n1 = parseFloat(display.value);
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
            n1 = parseFloat(displayValue.join(''));
            display.value = '';
            displayValue = [];
            operatorCounter++;
        }

    })
}

/* Equals button runs operate function when pressed. Uses first value as second operand if no second operand is entered. Displays error message and NaN  until cleared when user attempts to divide by zero. */

equalsButton.addEventListener('click', () => {
    n2 = parseFloat(displayValue.join(''));
    equalCounter = 1;
    if (operator === 'divide' && n2 === 0) {
        display.value = 'ERROR';
        divZeroCounter++;
    }
    else if (divZeroCounter >= 1) {
        display.value = 'NaN';
    }
    else if (displayValue.length === 0) {
        n2 = n1;
        display.value = operate(operator, n1, n2);
        n1 = parseFloat(display.value);
        n2 = 0;
    }
    else {
        display.value = operate(operator, n1, n2);
        n1 = parseFloat(display.value);
        n2 = 0;
    }

})