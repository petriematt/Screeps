/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manage.creepSpawn');
 * mod.thing == 'a thing'; // true
 */
var manageCreepSpawn = {
    run: function(spawn){
        
    var desiredHarvesters = 1;
    var desiredWorkers = 6;
    var desiredEnergyTransferers = 2;
    var availEnergy = Game.spawns[spawn].room.energyAvailable;
    
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var energyTransferers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyTransferer');
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' || creep.memory.role == 'builder');
    
    
    if(energyTransferers.length < desiredEnergyTransferers){
        if(availEnergy > 499){
            var newName = 'Mover_3_' + Game.time;    
            console.log('Spawning new mover: ' + newName);    
            Game.spawns[spawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName,{memory: {role: 'energyTransferer'}});
        }    
       else if(availEnergy > 399){
            var newName = 'Mover_2_' + Game.time;    
            console.log('Spawning new mover: ' + newName);    
            Game.spawns[spawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName,{memory: {role: 'energyTransferer'}});
        }     
        else if(availEnergy > 299){
            var newName = 'Mover_1_' + Game.time;    
            console.log('Spawning new mover: ' + newName);    
            Game.spawns[spawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE], newName,{memory: {role: 'energyTransferer'}});
        }     
    }
    if(harvesters.length < desiredHarvesters) {
        if(availEnergy > 549){
            var newName = 'Harvester_4_' + Game.time;    
            console.log('Spawning new harvester: ' + newName);    
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'harvester'}});
        }
        else if(availEnergy > 499){
            var newName = 'Harvester_3_' + Game.time;    
            console.log('Spawning new harvester: ' + newName);    
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,WORK,MOVE], newName,{memory: {role: 'harvester'}});
        }
        else if(availEnergy > 399){
            var newName = 'Harvester_2_' + Game.time;    
            console.log('Spawning new harvester: ' + newName);    
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        }
        else if(availEnergy > 299){
            var newName = 'Harvester_1_' + Game.time;    
            console.log('Spawning new harvester: ' + newName);    
            Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: 'harvester'}});
        }
    }
    else if(workers.length < desiredWorkers){
        if(availEnergy > 549){
            var newName = "Worker_4_" + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
        }        
        else if(availEnergy > 499){
            var newName = "Worker_3_" + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        else if(availEnergy > 399){
            var newName = "Worker_2_" + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        else if(availEnergy > 299){
            var newName = "Worker_1_" + Game.time;
            console.log('Spawning new worker: ' + newName);
            Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
    }
    }
};

module.exports = manageCreepSpawn;