/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('qSpawner');
 * mod.thing == 'a thing'; // true
 */

var qSpawner = {
    /** @param {Room} room **/
    adjustCreeps: function(spawnRoom, spawn){
        var availESources = Memory.rooms[spawnRoom].eSources;
        for(i=0; i<Object.keys(availESources).length; i++ ){
            //console.log(availESources[i].assignedCreep);
            
            if(availESources[i].assignedCreep == null || availESources[i].assignedCreep == 'cleared'){
                console.log("No Creeps assigned to "+availESources[1].eSourceId);
                var newName = "Harvester_"+Game.time;
                //var bestHarvesterBody = "[WORK,WORK,CARRY,CARRY,MOVE]"
                var testCanSpawn = Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName, {dryRun: true});
                //console.log("TestCanSpawn: "+testCanSpawn)
                if(testCanSpawn == 0){
                   console.log("Spawning a big one");
                    Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName, {memory: {role: 'harvester', assignedESource: availESources[i].eSourceID, spawnName: Game.spawns[spawn].name, creepName: newName, full: false}});
                    Memory.rooms[spawnRoom].eSources[i].assignedCreep = newName;
                }
                else{
                    console.log("Cannot spawn a big one")
                    var testCanSpawn = Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName, {dryRun: true});
                    //console.log("TestCanSpawn: "+testCanSpawn)
                }
                if(testCanSpawn == 0){
                    console.log("Spawning a little one")
                    Game.spawns[spawn].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester', assignedESource: availESources[i].eSourceId, spawnName: Game.spawns[spawn].name, creepName: newName, full: false}});
                    Memory.rooms[spawnRoom].eSources[i].assignedCreep = newName;
                }
                else{
                    console.log("Cannot spawn any")
                }
            
            }
            else{
               // console.log(availESources[i].eSourceId+" does not need a harvester");
            }
        }
    },
    cleanupCreepsMem: function(spawnRoom){
        //console.log("Cleaning Memory");
        for(var i in Memory.creeps){
            //console.log(Memory.creeps[i]);
            if(!Game.creeps[i]){
                console.log("Investigating: "+Memory.creeps[i].creepName)
                var eSources = Memory.rooms[spawnRoom].eSources;
                for( var j in eSources){
                    
                    if(eSources[j].eSourceId == Memory.creeps[i].assignedESource){
                        console.log(Memory.creeps[i].creepName+" thinks it is assigned to "+eSources[j].eSourceId);
                        if(eSources[j].assignedCreep == Memory.creeps[i].creepName){
                            console.log(eSources[j].eSourceId+" thinks it is assigned to "+Memory.creeps[i].creepName+" as well.  Clearing Source Assigned Creep")
                            eSources[j].assignedCreep = 'cleared';
                        }
                        else{
                            console.log(eSources[j].eSourceId+" is actuall assigned to "+eSources[j].assignedCreep+". Not clearing memory.")
                        }
                        
                    }
                    else{
                        console.log(Memory.creeps[i].creepName+" was not assigned to a source");
                    }
                }
                console.log("Deleting: "+Memory.creeps[i].creepName);
                delete Memory.creeps[i];
            }
        }
    }

    
};
module.exports = qSpawner;