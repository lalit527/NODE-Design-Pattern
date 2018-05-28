const asyncModule = require('./asyncModule');

const asyncModuleWrapper = module.exports;

asyncModuleWrapper.initialized = false;
asyncModuleWrapper.initialize = () => {
  activeState.initialize.apply(activeState, arguments);
};

asyncModuleWrapper.tellMeSomething = () => {
  activeState.tellMeSomething.apply(activeState, arguments);
};

let pending = [];
const notInitializedState = {
  initialize: function(callback) {
    console.log(callback);
    asyncModule.initialize(() => {
      asyncModuleWrapper.initialized = true;
      activeState = initializedState;

      pending.forEach(req => {
        asyncModule[req.method].apply(null, req.args);
      })
      pending = [];
      //callback();
      if(callback && typeof(callback) === 'function') {
        callback();
      }
    });  
  },

  tellMeSomething: callback => {
    return pending.push({
      method: 'tellMeSomething',
      args: arguments
    })
  }
}

let initializedState = asyncModule;
let activeState = notInitializedState;