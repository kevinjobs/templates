import lodash from 'lodash';
import rendererBaseConfig from "./renderer.base.config";

const rendererProdConfig = lodash.merge(rendererBaseConfig, {
  mode: 'production',
})

// console.log(rendererProdConfig);

export default rendererProdConfig;