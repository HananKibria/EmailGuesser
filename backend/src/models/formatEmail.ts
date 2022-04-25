export{}
const mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

const formatEmailSchema = new Schema({
    format:{
      type: String,
    },
    domain:{type:String},

});

var formatEmail = mongoose.model('formatEmail',formatEmailSchema );

module.exports = formatEmail;