const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('tutorial_event1', (param1, param2) => {
    console.log(`tutorial event has Occurred! with params \n` +
    `[param1 value: ${param1},param2 value: ${param2}] [param1 type: %s,param2 type: %s]`, typeof(param1), typeof(param2))
})

myEmitter.emit('tutorial_event1', 'Hello', 1);

class PersonEmitter extends EventEmitter{
   
    constructor(name){
        super();
        this._name = name;
    }

    get name(){
        return this._name;
    }
}


let nunoEventEmitter = new PersonEmitter('Nuno Relvao');

nunoEventEmitter.on('showname', () =>{
    console.log("My Name is : " + nunoEventEmitter.name)
});


nunoEventEmitter.emit('showname');