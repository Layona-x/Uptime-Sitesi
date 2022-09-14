const mongoose = require('mongoose')
const Schema = mongoose.Schema

const linkSchema = new Schema({
  userId:{
    type:String,
    require:true
  },
  link:{
    type:String,
    require:true,
  }
})

module.exports = mongoose.model("Link",linkSchema)