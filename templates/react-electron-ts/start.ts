/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-07 19:13:15
 * @LastEditTime : 2022-05-18 14:42:12
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \template-react-electron-ts\start.ts
 * @Description  : 
 */
import Wert from './bin/wert';
import rendererDevConfig from './webpack/renderer.dev.config';
import rendererProdConfig from './webpack/renderer.prod.config';
import mainConfig from './webpack/main.config';

const mode = process.env['NODE_ENV'] || 'development';

const isDev = mode === 'development';

function getRendererConfig (isDev: boolean) {
  if (isDev) {
    return rendererDevConfig;
  } else {
    return rendererProdConfig;
  }
}

const wert = new Wert({
  mode,
  mainConfig,
  rendererConfig: getRendererConfig(isDev),
});

wert.run();