const express = require('express');

const app = express();

const path = require ('path')


//MIDDLEWARE
//app.use(express.static('public'))

const myLogger = (req,res,next) => {
  console.log('middleware log1 ')
  next(); // next demessek bir sonraki middleware a gecemez (app.get)
}

app.use(myLogger)



// app.get('/' , (req,res) =>{

//     const photo = {
//         id:1,
//         name: 'photo name',
//         desc: 'photo description'
//     }
//     res.send(photo)
// })

 app.get('/' , (req,res) =>{
  res.sendFile(path.resolve(__dirname, 'temp/index.html'))
 })

app.use(express.static('public'))

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı...`);
});


