const OPERATORS = ["+", "-", "/", "*"];
const VALIDPARTOFNUM = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

let chainOfOperations = "";
let isOperatorSet = false;
let currentNum = "";
let resultTot = "";

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
    // replace all *, / with their corrsponding html entities, as well as remove any spaces
    // display the result afterwards
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

function hasSecondArgOpMorePrecedence(operation1, operation2) {
    if ((operation1 === "+" || operation1 === "-") && (operation2 === "*" || operation2 === "/")) {
        return true;
    }
    return false;
}

function evaluateChain(chainOfOperations) {
    let tokens = chainOfOperations.split("");

    let nums = [];
    let operations = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === " ") {
            continue;
        }

        if (VALIDPARTOFNUM.includes(tokens[i])) {
            let buf = "";
            while (i < tokens.length && VALIDPARTOFNUM.includes(tokens[i])) {
                buf = buf + tokens[i];
                i++;
            }
            nums.push(parseFloat(buf));

            // corrects offset for next iteration check
            i--;
        }

        if (OPERATORS.includes(tokens[i])) {
            while (operations.length > 0 && hasSecondArgOpMorePrecedence(tokens[i], operations[operations.length-1])) {
                let num2 = nums.pop();
                let num1 = nums.pop();
                nums.push(operate(operations.pop(), num1, num2));
            }

            operations.push(tokens[i]);
        }
    }

    // evaluates remaining operations
    while (operations.length > 0) {
        let num2 = nums.pop();
        let num1 = nums.pop();
        nums.push(operate(operations.pop(), num1, num2));
    }

    // returns final result rounded to 2 decimal places
    return Math.round(nums.pop()*100)/100;
}

function countDots(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === ".") {
            count++;
        }
    }
    return count;
}

function setupClearButton() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", e => {
        chainOfOperations = "";
        isOperatorSet = false;
        currentNum = "";
        resultTot = "";
        displayCurrentOperation(chainOfOperations);
        displayOperationResult(resultTot);
    });
}

function setupDeleteButton() {
    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", e => {
        // check if we have resultTot already
        if (resultTot !== "") {
            chainOfOperations = resultTot;
            isOperatorSet = false;
            currentNum = resultTot;
            resultTot = "";
            displayCurrentOperation(chainOfOperations);
            displayOperationResult(resultTot);
            return;
        }

        // check if we have an operator 
        if (OPERATORS.includes(chainOfOperations.charAt(chainOfOperations.length-2))) {
            // we need to remove an operator
            chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
            isOperatorSet = false;
        } else if (VALIDPARTOFNUM.includes(chainOfOperations.charAt(chainOfOperations.length-1))) {
            // we have either a digit or a dot, just remove it
            chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-1);
            currentNum = currentNum.slice(0, currentNum.length-1);
        }
        displayCurrentOperation(chainOfOperations);
        displayOperationResult(resultTot);
    });
}

function setupNumberButtons() {
    const numButtons = document.querySelectorAll(".number-buttons");
    numButtons.forEach(numButton => numButton.addEventListener("click", e => {
        // check if we have resultTot already 
        if (resultTot !== "") {
            chainOfOperations = "";
            isOperatorSet = false;
            currentNum = "";
            resultTot = "";
        }
        isOperatorSet = false;
        currentNum += e.target.value;
        chainOfOperations += e.target.value;
        displayCurrentOperation(chainOfOperations);
        displayOperationResult(resultTot);
    }));
}

function setupOperatorEvent(opString) {
    // check if we have resultTot already
    if (resultTot !== "") {
        chainOfOperations = resultTot;
        isOperatorSet = false;
        currentNum = resultTot;
        resultTot = "";
    }

    if (chainOfOperations === "") {
        alert("You cannot use an operator at the beginning of an expression!");
        return;
    }

    if (chainOfOperations.charAt(chainOfOperations.length-1) === ".") {
        // i.e., 65. <=> 65.0, assumes a 0 when no other number has been added after decimal point
        chainOfOperations += "0";
    }

    if (!isOperatorSet) {
        chainOfOperations = chainOfOperations + " " + opString + " ";
        isOperatorSet = true;
    } else {
        // change the operator previously written
        if (chainOfOperations.charAt(chainOfOperations.length-2) !== opString) {
            chainOfOperations = chainOfOperations.slice(0, chainOfOperations.length-3);
            chainOfOperations = chainOfOperations + " " + opString + " ";
        }
    }
    currentNum = "";
    displayCurrentOperation(chainOfOperations);
    displayOperationResult(resultTot);
}

function setupOperatorButtons() {
    const addButton = document.querySelector("#plus");
    const subtractButton = document.querySelector("#minus");
    const multiplyButton = document.querySelector("#times");
    const divideButton = document.querySelector("#divide");

    addButton.addEventListener("click", e => {
        setupOperatorEvent("+");
    });

    subtractButton.addEventListener("click", e => {
        setupOperatorEvent("-");
    });

    multiplyButton.addEventListener("click", e => {
        setupOperatorEvent("*");
    });

    divideButton.addEventListener("click", e => {
        setupOperatorEvent("/");
    });
}

function setupDotButton() {
    const dotButton = document.querySelector("#dot");
    dotButton.addEventListener("click", e => {
        // check if we have resultTot already
        if (resultTot !== "") {
            chainOfOperations = "";
            isOperatorSet = false;
            currentNum = "";
            resultTot = "";
        }

        if (countDots(currentNum) === 1) {
            // cannot add more than one dot
            alert("You cannot have a single number with 2 or more dots!");
            return;
        }

        if (chainOfOperations === "" || OPERATORS.includes(chainOfOperations.charAt(chainOfOperations.length-2))) {
            // translate . on its own i.e, . <=> 0.
            chainOfOperations += "0";
            currentNum += "0";
        }

        chainOfOperations += ".";
        currentNum += ".";
        displayCurrentOperation(chainOfOperations);
    });
}

function setupEqualButton() {
    const equalButton = document.querySelector("#equals");
    equalButton.addEventListener("click", e => {
        // check if we have resultTot already
        if (resultTot !== "") {
            return;
        }
        
        resultTot = evaluateChain(chainOfOperations).toString();
        if (resultTot === "NaN") {
            return;
        }
        if (resultTot === "Infinity") {
            chainOfOperations = "";
            isOperatorSet = false;
            currentNum = "";
            alert("Division by zero! Undefined!");
            return;
        }
        displayOperationResult(resultTot);
    });
}

function run() {
    // setup buttons
    setupClearButton();
    setupDeleteButton();
    setupNumberButtons();
    setupOperatorButtons();
    setupDotButton();
    setupEqualButton();
}

run();