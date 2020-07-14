const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const appendOwnerId = setField({
  from: 'params.user._id',
  as: 'data.ownerId'
});

// get boards of the auth user only
const queryWithAuthUser = setField({
  from: 'params.user._id',
  as: 'params.query.ownerId'
})

module.exports = {
  before: {
    all: [ authenticate('jwt'), ],
    find: [queryWithAuthUser],
    get: [queryWithAuthUser],
    create: [appendOwnerId],
    update: [queryWithAuthUser],
    patch: [queryWithAuthUser],
    remove: [queryWithAuthUser]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
