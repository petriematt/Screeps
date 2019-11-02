var roleHarvester = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var manageCreepSpawn = require('manage.creepSpawn');
var roleFixer = require('role.fixer');
var roleEnergyTransferer = require('role.energyTransferer');

module.exports.loop = function () {
    
    for(roomName in Game.spawns){
        var spawnName = roomName;
        
        manageCreepSpawn.run(spawnName);
    }
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' || creep.memory.role == 'builder');
    var myConstructionSites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    var myStructures = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    
    
    for (i=0; i < myStructures.length; i++){
        if(myStructures[i].hits/myStructures[i].hitsMax < .75 && fixers.length < 1){
            workers[0].memory.role = 'fixer';
        }
    }

    if(myConstructionSites.length > 0){
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        
        if(workers.length-1 > builders.length){
            //console.log(workers[0])
            workers[0].memory.role = 'builder';
        }
    }
    else if(builders.length > 0){
       builders[0].memory.role = 'upgrader';
    }
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.energyCache == null){
           // console.log("True");
        }
        else{
           // console.log(creep.memory.energyCache);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fixer'){
            roleFixer.run(creep);
        }
        if(creep.memory.role == 'energyTransferer'){
            roleEnergyTransferer.run(creep);
        }
    }
    displayCreeps();
}

function displayCreeps(){
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyTransferer');
    
    function Creeps(count){
        this.count = count;
    }
    
    var creepCount = {};
    creepCount.builder = new Creeps(builders.length);
    creepCount.upgrader = new Creeps(upgraders.length);
    creepCount.fixer = new Creeps(fixers.length);
    creepCount.mover = new Creeps(movers.length);
    
    console.log(creepCount);
}