/* eslint-disable */

import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Board extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = 'Board';

  static instanceDefaults() {
    return {
      name: '',
      background: '',
    };
  }
}
const servicePath = 'boards';
const servicePlugin = makeServicePlugin({
  Model: Board,
  service: feathersClient.service(servicePath),
  servicePath,
});
export default servicePlugin;
