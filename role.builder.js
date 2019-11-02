var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.energyCacheId == null){
            var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
            if(containersWithEnergy.length > 0){
            creep.memory.energyCache = containersWithEnergy[0].id;
            }
            else{
                creep.memory.energyCache = null;
            }
            
        }
        if(creep.memory.energyCache != null){
        if(creep.carry.energy == 0 && creep.memory.building ){
            creep.memory.building = false;
            creep.say('Gather');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity ){
            creep.memory.building = true;
            creep.say('Building');
        }
        
        if(!creep.memory.building) {
            if(creep.withdraw(Game.getObjectById(creep.memory.energyCache),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.energyCache), {visualizePathStyle: {stroke: '#EDA02E', opacity: .5}});
            }
        }
        
        else{
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            targets = targets.sort();
            
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#57ED2E', opacity: .5}});
            }
        }
        }
    }
};
module.exports = roleBuilder; 