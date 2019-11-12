<<<<<<< HEAD
var roommap = require('qRoomMap');
var spawner = require('qSpawner');
var harvester = require('qRole.Harvester');
var queue = require('qQueues');
var roomsHash = {};
module.exports.loop = function () {
    console.log('loop');
    var spawns = Game.spawns;
    for (spawn in spawns){
        var roomName = Game.spawns[spawn].room.name;
        if(typeof roomsHash[roomName] === "undefined"){
            roomsHash[roomName] = {};
            roomHash[roomName].energyQueue = new queue;
        }
        if(typeof Memory.rooms[roomName] === "undefined"){
            roommap.initSources(roomName);
            //cosnole.log('true'); 
            //console.log(roomName);
        }
        //Game.rooms[roomName].energyDumps = new queue;
        //if(!roomsHash[roomName].energyQueue.isEmpty()){
        //    console.log("The queue is empty");
       // }
        spawner.adjustCreeps(roomName, spawn);
        spawner.cleanupCreepsMem(roomName);
        
        for(var i in Game.creeps){
            if(Game.creeps[i].memory.role == 'harvester'){
                harvester.run(Game.creeps[i])
            }
        }
            
        }
}
   
=======
module.exports.loop = function () {
    console.log('Loop');
}
>>>>>>> 500fb4a608eb46478cad32303ef1239b017f1cad
