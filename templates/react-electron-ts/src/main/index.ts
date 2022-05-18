// handle the ReferenceError: regeneratorRuntime is not defined
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import { app, BrowserWindow } from "electron";
import path from 'path';

// main window
let mainWindow: BrowserWindow;

const isDev = process.env['NODE_ENV'] === 'development';

// console.log(process.env['NODE_ENV']);

function createWindow () {
  const w = new BrowserWindow({
    width: 1000,
    height: 600,
    // frame: true,
    resizable: true,
    // movable: true,
    // transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // this config make react use electron.
      webSecurity: false,
    }
  })

  if (isDev) w.loadURL("http://localhost:8080/");
  else w.loadFile(path.resolve('dist/renderer/index.html'));
  
  return w;
}

app.whenReady().then(() => {
  // create main window
  mainWindow = createWindow();

  // only in macOS
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})