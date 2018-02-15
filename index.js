console.log('Hello! version: 1.0.0');

const operators = {
    '+': (a, b) => b + a,
    '-': (a, b) => b - a,
    '*': (a, b) => b * a,
    '/': (a, b) => b / a,
};

const isOperator = (token) => token in operators;

const isValue = (token) => !isNaN(parseFloat(token)) && isFinite(token);

module.exports = (expression) => {
    expression = expression.trim();

    if (expression === '') return null;

    const tokens = expression.split(/\s+/);

    const stack = [];
    while (tokens.length) {
        let token = tokens.shift();

        if (isValue(token)) {
            stack.push(token);
        } else if (isOperator(token)) {
            let a = stack.pop();
            let b = stack.pop();

            if (a === null || b === null) return null;

            stack.push(operators[token](+a, +b));
        } else {
            return null;
        }
    }

    return stack.length !== 1 ? null : stack.pop();
};