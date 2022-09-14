const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type:String,
    unique: false,
    require:true
  },
  password:{
    type:String,
    unique: false,
    require:true,
  }
});
module.exports = mongoose.model("User",userSchema)