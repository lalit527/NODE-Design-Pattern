//non-blocking I/O and a polling loop, this is called busy-waiting

let resources = [SocketA, SocketB, pipeA]
while(!resources.isEmpty()){
    for(let i=0; i < resources.length; i++) {
        resource = resources[i];
        //try to read
        let data = resource.read();
        if(data === NO_DATA_AVAILABLE){
            //there is no data to read at the moment
            continue;
        }

        if(data === RESOURCE_CLOSED) {
            //the resource was closed, remove it from the list
            resources.remove(i);
        }else{
            //some data was received, process it
            consumeData(data);
        }
    }

}