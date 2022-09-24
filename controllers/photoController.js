const Photo = require('../models/Photo');
const fs = require ('fs')





exports.getAllPhotos =  async (req, res) => {  // http://localhost:3000/?page_2 =>> yine burayı render ediyor
    const page = req.query.page || 1 // (direkt ilk sayfaya girerse)
    const photosPerPage = 2
    const photoNumber = await Photo.find().countDocuments();

     const photos = await Photo.find({})
     .sort('-dateCreated')
     .skip((page-1)*photosPerPage)    
     .limit(photosPerPage)

    res.render('index' , {
      photos:photos,
      pages: Math.ceil(photoNumber / photosPerPage ),
      current: page

    }) 
}


exports.getPhoto = async (req, res) => {
    //  console.log(req.params.id)   632b389795abf94cae6db067 tıklanılan fotonun id'si
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    })
}


exports.createPhoto =  async (req, res) => {
    // // data gönderme console.log(req.body)  { title: 'Photo Title 1', description: 'Photo desc 1', image: '' }
    // // resim gönderme console.log(req.files.image) // { name: 'Ekran Resmi 2022-02-04 16.02.44.png',  data: <Buffer 89 50 4e 49 48 44 52 .. 534159 more bytes>, size: 534209, ...}
    
    //await Photo.create(req.body)  //önceden resim olmadan direkt bunu gonderirdik { title: 'Photo Title 1', description: 'Photo desc 1', image: '' }
    //res.redirect('/')
  
    const uploadDir= 'public/uploads' ;
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir)
    }
  
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  
    uploadImage.mv(uploadPath, async () => {   //uploadedPath'i oluştur , callbackte text+resmi Photo.create ile DB ye yükle
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadImage.name,    
      });    //Photo.create({title: 'ss' , desc: 'dafdsf' , image: ....}) oldu. Spread kullandık cunku req.body kendi kendine bir obje
    });
  
    res.redirect('/');
  }



exports.updatePhoto =  async (req, res) => { //aynısı var ama o get bu put
    // const photo = await Photo.findOne({_id: req.params.id})
     const photo = await Photo.findById(req.params.id)     //usttekiyle aynı
     photo.title=req.body.title
     photo.description=req.body.description
     await photo.save()
   
     res.redirect(`/photos/${req.params.id}`)
   
   }


exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    let deletedImage = __dirname + '/../public' + photo.image
    fs.unlinkSync(deletedImage)   //FOTOYU ONCE UPLOADSDAN KALDIR SENKRON FONKSİYONLA
 
    await Photo.findByIdAndRemove(req.params.id)   //SONRA DB DEN VE DE SİTEDEN
    res.redirect('/')
 
 }