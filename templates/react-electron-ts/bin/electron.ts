import path from 'path';
import proc from 'child_process';

const __dirname = path.resolve();

const electron = path.resolve(__dirname, 'node_modules/electron/dist/electron.exe');

const runElectron = (args: string[]) => {
  
  const opts: proc.SpawnOptions = {
    stdio: 'inherit',
    windowsHide: false
  }

  const child = proc.spawn(electron, args, opts);
  
  child.on('close', (code, signal) => {
    if (code === null) {
      console.error(electron, 'exited with signal', signal);
      process.exit(1);
    }
  })
}

export default runElectron;