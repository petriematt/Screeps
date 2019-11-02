var roleFixer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.energyCache == null){
            var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
            if(containersWithEnergy.length > 0){
            creep.memory.energyCache = containersWithEnergy[0].id;
            }
            else{
                creep.memory.energyCache = null;
            }
            
        }
        
        if(creep.memory.energyCache != null){
        
             if(creep.carry.energy == 0 && creep.memory.fixing ){
                creep.memory.fixing = false;
                creep.say('Gathering');
             }
            if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity ){
                creep.memory.fixing = true;
                creep.say('Fixing');
            }
        
            if(!creep.memory.fixing) {
                if(creep.withdraw(Game.getObjectById(creep.memory.energyCache),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.energyCache), {visualizePathStyle: {stroke: '#EDA02E', opacity: .5}});
             }
            }
        
            else{
                var targets = creep.room.find(FIND_STRUCTURES);
                for (i=0; i < targets.length; i++){
                    if(targets[i].hits/targets[i].hitsMax < .99){
                        if(creep.repair(Game.getObjectById(targets[i].id)) == ERR_NOT_IN_RANGE){
                            creep.moveTo(Game.getObjectById(targets[i].id),{visualizePathStyle: {stroke: '#57ED2E', opacity: .5}});
                        }    
                    }
                }
                creep.memory.role='upgrader';
            }
        }
    }
};
module.exports = roleFixer; 