const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    console.log(arg)
})
ipcRenderer.send('asynchronous-message', 'ping')

const result = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(result) // prints "pong" in the DevTools console