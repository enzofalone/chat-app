const { default: mongoose } = require("mongoose");

const parseObjectId = (stringId) => {
  return mongoose.Types.ObjectId(stringId);
};
module.exports = { parseObjectId };
