/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-18 14:51:13
 * @LastEditTime : 2022-05-18 14:51:13
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \template-react-electron-ts\scripts\electron.js
 * @Description  : 
 */
const path = require('path');
const proc = require('child_process');

function runElectron(args) {
  const electron = path.resolve(__dirname, 'node_moduels/electron/dist/electron.exe');

  const opts = {
    stdio: 'inherit',
    windowsHide: false,
  }

  const child = proc.spawn(electron, args, opts);

  child.on('close', (code, signal) => {
    if (code === null) {
      console.error(electron, 'exited with signal', signal);
      process.exit(1);
    }
  })
}

module.exports = runElectron;