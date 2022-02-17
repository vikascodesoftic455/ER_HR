const multer =require('multer')

const multerStroge =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/upload/document')
    },
    filename:function(req,file,cb){
        const data = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname
        cb(null,data)
    }
    
})


const Upload = multer({storage:multerStroge})


module.exports =Upload