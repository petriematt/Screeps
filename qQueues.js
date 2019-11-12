/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('qQueues');
 * mod.thing == 'a thing'; // true
 */
class Queue{
    constructor(){
        this.items = [];
    }
    queueUp(element){
        this.items.push(element);
    }
    next(){
        if(this.isEmpty()){
            return "Underflow";
        }
        return this.items.shift();
    }
    isEmpty(){
        return this.items.length == 0;
    }
}
module.exports = Queue;