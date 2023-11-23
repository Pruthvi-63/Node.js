class CustomEventEmitter {
  listeners = {};

  // adds a event in to listeners object with the key value pair,
  //  key is event name, value is an arry of functions that are executed for theat event
  addEventListener(event, func) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(func);
    return this;
  }

  //calls the addEvent function that created a key with event name and array of functions
  on(event, func) {
    return this.addEventListener(event, func);
  }

  // removes the funtions from the array of functions that are available for th event
  removeListener(event, func) {
    let listener = this.listeners[event];
    if (!listener) return this;
    for (let i = listener.length; i > 0; i--) {
      if (listener[i].toString() === func.toString()) {
        listener.splice(i, 1);
        break;
      }
    }
    return this;
  }

  //calls the remove listener functions
  off(event, func) {
    return this.removeListener(event, func);
  }

  //calls the function only once for the event no matter how many times it emits and removes the event after executing;
  once(event, func) {
    this.listeners[event] = this.listeners[event] || [];
    const callOnce = () => {
      func();
      this.removeListener(event, func);
    };
    this.listeners[event].push(event, callOnce);
  }

  // emits the event name and arguements that neeed to be passed to functions
  emit(event, ...args) {
    let functions = this.listeners[event];
    if (!functions) return false;
    functions.forEach((func) => {
      func(...args);
    });
    return true;
  }
}

const test = new CustomEventEmitter();
test.addEventListener("testing", () => {
  console.log("testing");
});

test.on("hello", (data) => {
  console.log("hello", data);
});

test.emit("hello", "jewsssss");
