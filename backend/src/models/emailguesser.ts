export{}
const mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

const emailGuesserSchema = new Schema({
    firstName:{
      type: String,
    },
    lastName:{type:String},
    domain:{type:String},
    email:{type:String}

});

var emailGuesser = mongoose.model('emailGuesser',emailGuesserSchema );

module.exports = emailGuesser;