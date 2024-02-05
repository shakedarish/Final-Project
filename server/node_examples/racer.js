let racer = function() {
    setTimeout(() => console.log("timeout1"), 1000)      // It's waiting like a normal person at a queue
    
    setImmediate(() => console.log("immediate"))      // check queue of the next cycle of the event loop
                                                      // It's like get to last and be take care of first 
                                                      // but always after of .nextTick and before of setInterval(, 0)

    process.nextTick(() => console.log("nextTick"))
    
    setTimeout(() => console.log("timeout2"), 500)
    setTimeout(() => console.log("timeout3"), 0)
    console.log("current event loop")
  }
  
  racer() 