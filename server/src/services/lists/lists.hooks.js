const { authenticate } = require('@feathersjs/authentication').hooks;

const restrictToBoardOwner = require('../../hooks/restrict-to-board-owner');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [restrictToBoardOwner()],
    update: [restrictToBoardOwner()],
    patch: [restrictToBoardOwner()],
    remove: [restrictToBoardOwner()]
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
