const display = document.getElementById('display');
let currentInput = '';
let result = '';
let operator = null;
let waitingForSecondOperand = false;
let parenthesisCount = 0;

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function handleButtonClick(value) {
    gsap.fromTo(event.target, { scale: 1 }, { scale: 1.1, duration: 0.1, ease: 'power1.out', yoyo: true, repeat: 1 });

    if (value === 'C') {
        currentInput = '';
        result = '';
        operator = null;
        waitingForSecondOperand = false;
        parenthesisCount = 0;
        updateDisplay();
        return;
    }

    if (value === '=') {
        try {
            if (parenthesisCount > 0) {
                currentInput = 'Error: Missing )';
            } else {
                result = calculate(currentInput);
                if (result === Infinity || isNaN(result)) {
                    currentInput = 'Error';
                } else {
                    currentInput = result.toString();
                }
            }
        } catch (e) {
            currentInput = 'Error';
        }
        waitingForSecondOperand = true;
        updateDisplay();
        return;
    }

    if (value === '(') {
        currentInput += value;
        parenthesisCount++;
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    if (value === ')') {
        if (parenthesisCount > 0) {
            currentInput += value;
            parenthesisCount--;
        }
        updateDisplay();
        return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
        if (waitingForSecondOperand) {
            operator = value;
            waitingForSecondOperand = false;
            currentInput += value;
        } else if (currentInput !== '') {
            const lastChar = currentInput.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
        return;
    }

    if (value === '.') {
        const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes('.')) {
            currentInput += '.';
        }
    } else {
        if (waitingForSecondOperand) {
            currentInput = value;
            waitingForSecondOperand = false;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

function calculate(expression) {
    const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
    let outputQueue = [];
    let operatorStack = [];
    let tokens = expression.match(/(\d+\.?\d*)|[+\-*/()]|[\s]+/g).filter(Boolean);

    for (let token of tokens) {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(token);
        } else if (['+', '-', '*', '/'].includes(token)) {
            while (operatorStack.length > 0 && ['+', '-', '*', '/'].includes(operatorStack[operatorStack.length - 1]) && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            if (operatorStack[operatorStack.length - 1] === '(') {
                operatorStack.pop();
            } else {
                return Infinity;
            }
        }
    }

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    let stack = [];
    for (let token of outputQueue) {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            if (token === '+') stack.push(a + b);
            if (token === '-') stack.push(a - b);
            if (token === '*') stack.push(a * b);
            if (token === '/') {
                if (b === 0) return Infinity;
                stack.push(a / b);
            }
        }
    }
    return stack.pop();
}

window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9]/.test(key) || key === '.') {
        handleButtonClick(key);
    } else if (key === '+') {
        handleButtonClick('+');
    } else if (key === '-') {
        handleButtonClick('-');
    } else if (key === '*') {
        handleButtonClick('*');
    } else if (key === '/') {
        handleButtonClick('/');
    } else if (key === '(') {
        handleButtonClick('(');
    } else if (key === ')') {
        handleButtonClick(')');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleButtonClick('=');
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleButtonClick('C');
    }
});
