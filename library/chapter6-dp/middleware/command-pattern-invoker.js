class Invoker {
  constructor() { 
    this.history = []; 
  }
  run (cmd) { 
    this.history.push(cmd); 
    cmd(); 
    console.log('Command executed', cmd.serialize()); 
  }

  delay (cmd, delay) { 
    setTimeout(() => { 
      this.run(cmd); 
    }, delay) 
  }

  undo () { 
    const cmd = this.history.pop(); 
    cmd.undo(); 
    console.log('Command undone', cmd.serialize()); 
  }
}