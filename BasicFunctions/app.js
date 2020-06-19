//Basic start Log
console.log('Hello World NodeJs');

const tutorial = require('./tutorial')
//Call function from another "Exported module"
console.log(tutorial);
console.log('Result of 1+1 is ' + tutorial.sum(1,1));
console.log('Result of 1-1 is ' + tutorial.subtract(1,1));
console.log('Result of 1/1 is ' + tutorial.divide(1,1));
console.log('Result of 1*1 is ' + tutorial.multiply(1,1));
 new tutorial.tutorialClass();

