/* eslint-disable */

import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class List extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = 'List';

  static instanceDefaults() {
    return {
      name: '',
      order: 0,
      boardId: '',
      archived: false
    };
  }
}
const servicePath = 'lists';
const servicePlugin = makeServicePlugin({
  Model: List,
  service: feathersClient.service(servicePath),
  servicePath,
});
export default servicePlugin;
