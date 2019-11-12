var roomMap = {
    /** @param {Room} room **/
    distanceBetween: function(xOne, yOne, xTwo, yTwo){
        var Xs = xTwo - xOne;
        var Ys = yTwo - yOne;
        
        var XsPow = Math.pow(Xs, 2);
        var YsPow = Math.pow(Ys, 2);
        
        var XY = XsPow+YsPow;
        
        var distance = Math.sqrt(XY);
        return distance;
    },
    eSuckerSlots: function(spawnRoom) {
        const sources = spawnRoom.find(FIND_SOURCES);
            //console.log(sources);
            for(var i = 0; i < sources.length; i++){
                //console.log(sources[i].pos);
                var localMap = [
                    [sources[i].pos.x-1,sources[i].pos.y-1],
                    [sources[i].pos.x,sources[i].pos.y-1],
                    [sources[i].pos.x+1,sources[i].pos.y-1],
                    [sources[i].pos.x-1,sources[i].pos.y],
                    [sources[i].pos.x,sources[i].pos.y],
                    [sources[i].pos.x,sources[i].pos.y],
                    [sources[i].pos.x-1,sources[i].pos.y+1],
                    [sources[i].pos.x,sources[i].pos.y+1],
                    [sources[i].pos.x+1,sources[i].pos.y+1]
                ];
                //console.log(localMap);
                //console.log(spawnRoom.name);
                const roomBuffer = new Room.Terrain(spawnRoom.name)
                for(var j = 0; j < localMap.length; j++){
                    //console.log(localMap[j]);
                    //console.log("X: "+localMap[j][0]+" Y: "+localMap[j][1]);
                    if(roomBuffer.get(localMap[j][0],localMap[j][1]) == 0 
                        || roomBuffer.get(localMap[j][0],localMap[j][1]) == 2){
                        console.log('Usable Space');
                        var roomName = spawnRoom.name;
                        if(Memory.room.roomName == null){
                            Memory.room.roomName = roomName;
                        }
                        
                    }
                }
            }
    },
    initSources: function(spawnRoom){
        console.log("Initing Sources....");
        var eSources = Game.rooms[spawnRoom].find(FIND_SOURCES);
       // Memory.rooms = {};
        Memory.rooms[spawnRoom] = {};
        Memory.rooms[spawnRoom].eSources = {};
        //console.log(eSources);
        for (var i in eSources){
            //Memory.rooms[spawnRoom].eSources[i] = {eSourceId: eSources[i].source, creep: null}
            //console.log(Memory.rooms);
            //console.log(Memory.rooms[spawnRoom]);
            //console.log(eSources[i]);
            Memory.rooms[spawnRoom].eSources[i] = {eSourceId: eSources[i].id, assignedCreep: null};
        } 
    }
};
module.exports = roomMap;

