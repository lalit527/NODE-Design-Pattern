const statusUpdateService = {
  statusUpdates: {},
  sendUpdate: function(status) {
    console.log('Status sent: ' + status);
    let id = Math.floor(Math.random() * 1000000);
    statusUpdateService.statusUpdates[id] = status; 
    return id;
  }
}
function createSendStatusCmd(service, status) {
  let postId = null;
  const command = () => {
    postId = service.sendUpdate(status);
  }
  const undo = () => {
    if(postId) { 
      service.destroyUpdate(postId); 
      postId = null; 
    }
  }
  command.serialize = () => { 
    return {type: 'status', action: 'post', status: status}; 
  };
  return command;
}
