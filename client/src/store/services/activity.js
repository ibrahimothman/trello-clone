/* eslint-disable */

import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Activity extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }

  static modelName = 'Activity';

  static instanceDefaults() {
    return {
      text: '',
      boardId: null,
      userId: null,
    };
  }

  // Updates `data.user` to be an instance of the `User` class.
  static setupInstance(data, { models }) {
    if (data.userId) {
      const userName = new models.api.User({_id: data.userId}).displayName;
      data.text = `**${userName}** ${data.text}`;
    }
    return data
  }

}
const servicePath = 'activities';
const servicePlugin = makeServicePlugin({
  Model: Activity,
  service: feathersClient.service(servicePath),
  servicePath,
});
export default servicePlugin;
