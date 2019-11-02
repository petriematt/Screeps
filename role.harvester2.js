var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
            if(creep.memory.targetSource == null){
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.targetSource = sources[0].id;
            }
            //console.log(creep.memory.targetSource);
            if(creep.harvest(Game.getObjectById(creep.memory.targetSource)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.targetSource), {visualizePathStyle: {stroke: '#EDA02E', opacity: .5}});
            }
    }
        
};

module.exports = roleHarvester;