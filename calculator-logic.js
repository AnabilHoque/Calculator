function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
    }
}


function run() {
    let currOperator;
    let num1;
    let num2;

    // setup buttons
    setupAdditionButton();
}