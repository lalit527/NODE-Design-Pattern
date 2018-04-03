//synchronous event demultiplexer or event notification interface
socketA, pipeB;
watchedList.add(socketA, FOR_READ);
watchedList.add(pipeB, FOR_READ);

while(events = demultiplexer.watch(watchedList)) {
    //event loop
    for(event in events) {
        //This read will never block and will always return data
        data = event.resource.read();
        if(data === RESOURCE_CLOSED) {
            //the resource was closed, remove it from the watched list
            demultiplexer.unwatch(event.resource);
        }else{
            //some data was received, process it
            consumeData(data);
        }
    }

}