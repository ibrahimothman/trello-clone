/* eslint-disable */

import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class User extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = 'User';

  static instanceDefaults() {
    return {
      email: '',
      displayName: '',
      imageUrl: '',
      password: '',
    };
  }
}
const servicePath = 'users';
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath,
});
export default servicePlugin;
