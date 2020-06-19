class tutorialClass {    
    constructor(){
      console.log('object created');
    }    
}

function sum(num1, num2) {
    return num1 + num2;
} 

function subtract(num1, num2) {
    return num1 - num2;
} 

function multiply(num1, num2) {
    return num1 * num2;
} 

function divide(num1, num2) {
    return num1 / num2;
} 

module.exports = {sum: sum, subtract: subtract, multiply: multiply, divide: divide, tutorialClass: tutorialClass }