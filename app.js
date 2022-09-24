const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');
const fs = require ('fs')
const methodOverride = require('method-override') //bazı tarayıcılar put requesti tanımadıgı ıcın posta cevırmeye yarar (foto guncellemede)
//edit.ejs de POST olarak kullandık desteklemedıgı ıcın ama routes de aynı yeri PUT olarak yazdık

const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')

//CONNECT DB
const mongoAtlasUri =
  'mongodb+srv://ahmetares:12345@cluster0.8qfcqbi.mongodb.net/pcat-test-db2';
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log(' Mongoose is connected')
  );
} catch (e) {
  console.log('could not connect');
}


//TEMPLATE ENGİNE
app.set('view engine', 'ejs');



//MIDDLEWARE
//middleware fonk calıstırmak ıcın use kullanılır
app.use(express.static('public')); // express.static dışardaki static dosyaları (css,html,video,photo) express de kullanabilmek için kullanılır
app.use(express.urlencoded({ extended: true })); //post için
app.use(express.json()); //post için
app.use(fileUpload()); // file upload için - express-fileupload
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
})) //foto guncelleme ıcın PUT = POST



//ROUTES
app.get('/', photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


//SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı...`);
});


