const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formSchema = new Schema({
  removed: {
    type: Boolean,

    default: false,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  contry: {
    type: String,
    trim: true,
  },
  datestart: {
    type: String,
    trim: true,
  },
  dateend: {
    type: Date,
    default: Date.now,
  },
  montestart: {
    type: Number,
    trim: true,
  },
  monthend: {
    type: Number,
    trim: true,
  },
});
module.exports = mongoose.model('Form', formSchema);

