var roleUpgrader = {

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
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 Gather');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#57ED2E', opacity: .5}});
            }
        }
        else {
           // console.log(Game.getObjectById(creep.memory.energyCache));
            if(creep.withdraw(Game.getObjectById(creep.memory.energyCache),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.energyCache), {visualizePathStyle: {stroke: '#EDA02E', opacity: .5}});
            }
        }
        }
    }
};

module.exports = roleUpgrader;