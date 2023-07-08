function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    return result;
}

function displayLast(s) {
    const current = document.querySelector(".last-operation-display");
    current.innerHTML = s;
}

function displayCurrent(s) {
    const current = document.querySelector(".current-operation-display");
    current.textContent = s;
}


function run() {
    let currOperator;
    let num1;
    let num2;

    // setup buttons
    const numButtons = document.querySelectorAll(".number-buttons");
    numButtons.forEach(numButton => numButton.addEventListener("click", e => {
        displayCurrent(e.target.value);
    }));

    const addButton = document.querySelector("#plus");
    addButton.addEventListener("click", e => {
        currOperator = "+";
        displayLast("&plus;");
    });

    const subtractButton = document.querySelector("#minus");
    subtractButton.addEventListener("click", e => {
        currOperator = "-";
        displayLast("&minus;");
    });

    const multiplyButton = document.querySelector("#times");
    multiplyButton.addEventListener("click", e => {
        currOperator = "*";
        displayLast("&times;");
    });

    const divideButton = document.querySelector("#divide");
    divideButton.addEventListener("click", e => {
        currOperator = "/";
        displayLast("&divide;");
    });
}

run();