var roleEnergyTransferer = {

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
        if(creep.carry.energy < 1) {
            if(creep.withdraw(Game.getObjectById(creep.memory.energyCache),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.energyCache), {visualizePathStyle: {stroke: '#EDA02E', opacity: .5}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            targets = targets.sort();
            //console.log(targets)
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#57ED2E', opacity: .5}});
                }
            }        
            else{
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#1830EE', opacity: .5}});
            }
        }
        }
        

    }
};

module.exports = roleEnergyTransferer;