// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { params, data, app } = context;
    const board = await app.service('boards').get(data.boardId,{
      query: {
        $select: {ownerId: 1, _id: 0}
      }
    });
    console.log(board.ownerId);
    console.log(params.user._id);
    if (board.ownerId.toString() !== params.user._id.toString()){
      return Promise.reject(new Error('Un-Authorized'));
    }
    return context;
  };
};
