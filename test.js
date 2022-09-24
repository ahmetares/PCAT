// ---- önce mongoose u oluştur ve mongoose connectle database'e bağlan
// mongoose => mongoose.connect(uri)  => database oluşturuldu

//---- sonrasında mongoose.schema dan schemanı oluştur (Photo)
// Schema (from mongoose.schema) => 
// PhotoSchema = new Schema(title,description) => 
// Photo = mongoose.model('photo', PhotoSchema)


//CREATE DB
const mongoose = require('mongoose');
const mongoAtlasUri = 'mongodb+srv://ahmetares:12345@cluster0.8qfcqbi.mongodb.net/pcat-test-db'
try {
  // Connect to the MongoDB cluster
   mongoose.connect(mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },() => 
   console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}


//CREATE SCHEMA
const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
  title: String,
  description: String,
})                          //mongoose 'Photo' yu compass da photos a çevirdi
const Photo = mongoose.model('Photo', PhotoSchema);


// //CREATE A PHOTO
Photo.create({
  title: 'photo title 1',
  description: 'photo descp 1',
})

Photo.create({
  title: 'photo title 2',
  description: 'photo descp 22',
})


// //READ THE PHOTOS
Photo.find({}, (err,data) => {
  console.log(data)
})

//UPDATE THE PHOTO
const id = '6329f42cb04a54a7f55442cf'
Photo.findByIdAndUpdate(id,
  {
    title:'photo title 111 updated',
    description:'photo desc 111 updated'
  },
  { 
    new: true
  },
  (err,data) => {
    console.log(data)
  })

// //DELETE THE PHOTO 
const id = '6329f42cb04a54a7f55442cf'
Photo.findByIdAndRemove(id, (err,data)=>{
  console.log('data is removed')
})

