const readline = require('readline');
const { getUnpackedSettings } = require('http2');
const { Console } = require('console');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

let num1 = Math.floor((Math.random() *10) >> 1);
let num2 = Math.floor((Math.random() *10) >> 1);
let answer = num1 + num2;
let ntimes = 0;
rl.question(`What is ${num1} + ${num2}? `, function (userInput) {
    
    try{
        if (userInput.trim() == answer){
            console.log('That is very accurate and correct at the first try!!!!')
            rl.close();
        }
        else{
            console.log('OMG what a dumb ass answer!, the correct answer would be somehwere between %s and %s', answer -5, answer +5)
            rl.setPrompt(`Thas is incorrect, try again, What is ${num1} + ${num2}? `);
            rl.prompt();
            rl.on('line', (userInput)=>{
                //console.log(answer);
                ntimes++;
                if (userInput.trim() == answer){
                    console.log(`That is correct but it took you ${ntimes} tries for the correct answer! Shame on you!`)
                    rl.close();
                }
                else
                {
                    rl.setPrompt(`Still incorrect, try again, What is ${num1} + ${num2}? `);
                    rl.prompt();
                }
            })
        }
    }
    catch(err){
        console.log('Error %s', err);
        rl.close();
    }  

   
});

rl.on('close', ()=>{
    console.log("ReadLine was closed!")
})

