const {Schema,model} = require('mongoose');

const postSchema = new Schema({
  text: String,
  title: String,
});

module.exports = model('Post', postSchema);