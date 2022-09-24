const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
}); //mongoose 'Photo' yu compass da photos a çevirdi
const Photo = mongoose.model('Photo', PhotoSchema);



module.exports = Photo
//app.js de kullanacagız