const toggleElement = document.querySelector('.themes__toggle');

const toggleLightTheme = () => {
    toggleElement.classList.toggle('themes__toggle--isActive');
};
const toggleLightThemeKey = (event) => (event.key==='Enter') && toggleLightTheme();

toggleElement.addEventListener('keydown' , toggleLightThemeKey)
toggleElement.addEventListener( 'click', toggleLightTheme);

// Logic for Calculator 

let storedNumber = '';
let currentNumber = '';
let operation = '';

const resultElement = document.querySelector('.calc__result');
const keyElements = document.querySelectorAll('[data-type');

const updateScreen = (value) => {
    resultElement.innerText = !value ? "0" : value ;
};

const numberButtonHandler = (value) =>
{
    if (value === '.' && currentNumber.includes('.')) return;
            
    if (value === '0' && !currentNumber) return;

    currentNumber += value;

    updateScreen(currentNumber);
};

const resetButtonHandler = () => {
    storedNumber = '';
    currentNumber = '';
    operation = '';
updateScreen(currentNumber);
};

const backSpaceButtonHandler = () => {
    if(!currentNumber || currentNumber=== '0') return

    if(!currentNumber.length === 1 ) {
        currentNumber = '' ;
    }else {
        currentNumber = currentNumber.substring(0, currentNumber.length -1 );
    }
    updateScreen(currentNumber)
};

const executeOperation = () => {
if(currentNumber && storedNumber && operation) {
    switch(operation) {
        case"+" :
            storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
            break;
        case"-" :
            storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
            break;
        case"*" :
            storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
            break;
        case"/" :
            storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
            break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
}
}

const operationButtonHandler = (operationValue) => {
    if (!storedNumber && !currentNumber) return;

    if(currentNumber && !storedNumber) {
        storedNumber = currentNumber;
        currentNumber = '';
        operation = operationValue ;
    } else if (storedNumber) {
        operation = operationValue
    }
    if (currentNumber) executeOperation();
}

const keyElementHandler = (element ) => {
    element.addEventListener('click', ()=> {
        const type = element.dataset.type;
        if(type === 'number' )
        { numberButtonHandler(element.dataset.value) ;
}        else if (type === 'operation')
            { switch (element.dataset.value) {
                case"c" :
                    resetButtonHandler();
                    break;
                case"Backspace":
                    backSpaceButtonHandler();
                    break;
                case"Enter" :
                    executeOperation();
                    break;
                default:
                    operationButtonHandler(element.dataset.value);
            } }
})
};

keyElements.forEach(keyElementHandler);

// Using keyboard as input source 

const availableNumber = ["0","1","2","3","4","5","6","7","8","9","."];
const availableOperators = ["+", "-", "*", "/"];
const availableKeys = [...availableNumber , ...availableOperators , "Backspace" , "Enter" , "c"]

window.addEventListener ("keydown" , (event) => {
    //keyboardWithoutHovering(event.key)
    keyboardWithHovering(event.key)
});

const keyboardWithoutHovering = (key) => {
    if (availableNumber.includes(key)) {
        numberButtonHandler(key);
    }else if (availableOperators.includes(key)) {
        operationButtonHandler(key);
    }else if (key === "Backspace") {
        backSpaceButtonHandler();
    }else if (key==="Enter"){
        executeOperation();
    }else if (key === "c") {
        resetButtonHandler();
    }
}

const keyboardWithHovering = (key) => {
    if (availableKeys.includes(key)) {
        const button = document.querySelector(`[data-value="${key}"]`);
        button.classList.add("hover");
        button.click();
        setTimeout(()=>
            button.classList.remove("hover")
        ,200);
}}