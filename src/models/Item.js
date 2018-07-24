const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const Item = new Schema({
  item: {
    type: String
  },
  addDate: {
    type: Date, default: new Date()
  },
},{
  collection: 'items'
});

module.exports = mongoose.model('Item', Item);
