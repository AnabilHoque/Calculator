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

function displayCurrentOperation(s) {
    const replacedSWithTimes = s.replaceAll("*", "&times;")
    const replacedSWithDivide = replacedSWithTimes.replaceAll("/", "&divide;");
    const whitespaceRemovedS = replacedSWithDivide.replace(/\s/g, "");
    const current = document.querySelector(".current-operation");
    current.innerHTML = whitespaceRemovedS;
}

function displayOperationResult(s) {
    const current = document.querySelector(".operation-result");
    current.textContent = s;
}

function evaluate(chainOfOperations) {
    const arr = chainOfOperations.split(" ");
    console.log(arr);
}

function run() {
    let operators = ["+", "-", "/", "*"];
    let chainOfOperations = "";
    let isOperatorSet = false;
    let currentNum = "";

    // setup buttons
    const numButtons = document.querySelectorAll(".number-buttons");
    numButtons.forEach(numButton => numButton.addEventListener("click", e => {
        isOperatorSet = false;
        currentNum += e.target.value;
        chainOfOperations += e.target.value;
        displayCurrentOperation(chainOfOperations);
    }));

    const addButton = document.querySelector("#plus");
    addButton.addEventListener("click", e => {
        if (!isOperatorSet) {
            chainOfOperations += " + ";
            isOperatorSet = true;
        } else {
            if (chainOfOperations.charAt(chainOfOperations.length-2) !== "+") {
                chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
                chainOfOperations += " + ";
            }
        }
        currentNum = "";
        displayCurrentOperation(chainOfOperations);
    });

    const subtractButton = document.querySelector("#minus");
    subtractButton.addEventListener("click", e => {
        if (!isOperatorSet) {
            chainOfOperations += " - ";
            isOperatorSet = true;
        } else {
            if (chainOfOperations.charAt(chainOfOperations.length-2) !== "-") {
                chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
                chainOfOperations += " - ";
            }
        }
        currentNum = "";
        displayCurrentOperation(chainOfOperations);
    });

    const multiplyButton = document.querySelector("#times");
    multiplyButton.addEventListener("click", e => {
        if (!isOperatorSet) {
            chainOfOperations += " * ";
            isOperatorSet = true;
        } else {
            if (chainOfOperations.charAt(chainOfOperations.length-2) !== "*") {
                chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
                chainOfOperations += " * ";
            }
        }
        currentNum = "";
        displayCurrentOperation(chainOfOperations);
    });

    const divideButton = document.querySelector("#divide");
    divideButton.addEventListener("click", e => {
        if (!isOperatorSet) {
            chainOfOperations += " / ";
            isOperatorSet = true;
        } else {
            if (chainOfOperations.charAt(chainOfOperations.length-2) !== "/") {
                chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
                chainOfOperations += " / ";
            }
        }
        currentNum = "";
        displayCurrentOperation(chainOfOperations);
    });
}

run();