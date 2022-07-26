// preload with contextIsolation enabled
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  sayHello: () => {
    console.log("hello")
  }
})