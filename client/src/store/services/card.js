/* eslint-disable */

import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Card extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = 'Card';

  static instanceDefaults() {
    return {
      title: '',
      order: 0,
      listId: '',
      archived: false,
      description: '',
      members: []
    };
  }
}
const servicePath = 'cards';
const servicePlugin = makeServicePlugin({
  Model: Card,
  service: feathersClient.service(servicePath),
  servicePath,
});
export default servicePlugin;
