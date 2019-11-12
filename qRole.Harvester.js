/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('qRole.Harvester');
 * mod.thing == 'a thing'; // true
 */
var roommap = require('qRoomMap');
var RoleHarvester = {
    run: function(creep) {
        if(creep.spawning == false){
            //console.log(creep.name+" thinks it is full: "+creep.memory.full)
            //console.log(creep.name+" has used "+creep.store.getUsedCapacity(RESOURCE_ENERGY)+" out of "+creep.store.getCapacity(RESOURCE_ENERGY)+" units")
            if(creep.memory.full == false){
                var eSource = Game.getObjectById(creep.memory.assignedESource)
                //if(creep.harvest(eSource) == ERR_NOT_IN_RANGE && (creep.store.getUsedCapacity(RESOURCE_ENERGY) != creep.store.getCapacity(RESOURCE_ENERGY))){
                console.log(roommap.distanceBetween(creep.pos.x, creep.pos.y, eSource.pos.x, eSource.pos.y))
                if(roommap.distanceBetween(creep.pos.x, creep.pos.y, eSource.pos.x, eSource.pos.y) >= 2){
                   // if(creep.harvest(eSource) == OK && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                        
                   // }
                    //else{
                    //    creep.memory.full = true;
                   // }
                   creep.moveTo(eSource);
                }
                else{
                    console.log(creep.name+" is close enough to "+creep.memory.assignedESource);
                    console.log("Used: "+creep.store.getUsedCapacity(RESOURCE_ENERGY)+"  Free: "+creep.store.getFreeCapacity(RESOURCE_ENERGY))
                 if(creep.memory.full == false && creep.store.getFreeCapacity(RESOURCE_ENERGY) != 0){
                     creep.harvest(eSource);
                 }
                 else if(creep.memory.full == false && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                     creep.memory.full = true;
                 }   
                    
                }
            }
            else{
            if(Game.spawns[creep.memory.spawnName].energy < Game.spawns[creep.memory.spawnName].energyCapacity && creep.memory.full == true) {
                if(creep.transfer(Game.spawns[creep.memory.spawnName], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns[creep.memory.spawnName]);
                }
                if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.full = false;
                }
            }
            else if(creep.memory.full == true){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
                if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.full = false;
                
                }
            }
            }

        }
    }
}
module.exports = RoleHarvester;