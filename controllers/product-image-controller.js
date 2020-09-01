const services = require('../services/product-image-service')
const multer  = require('multer')
const path = require("path")

const maxUploadImgCount = 10;
const maxUploadFileSize = 1000000;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, req.params.id + '-' + 'product' + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};



exports.uploadProductImage =  (req, res) => {    
    // 'profile_pic' - name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter, limits:{files:1, fileSize: maxUploadFileSize} }).any();
    //let upload = multer({ dest: 'uploads/' }).single('profile_pic');

    upload(req, res, (err) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        services.uploadProductImage(req.params.id, req.files)
        .then( (result) => {
            res.send(result);    
        }
        )
        .catch( (error) => {
            res.status(500).send(error)
            }   
        );  
    });
}

exports.uploadProductImages = (req, res) => {
    // 'multiple_images' is the name of our file input field
    //let upload = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', maxUploadImgCount);
    //let upload = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', maxUploadImgCount);
    let upload = multer({ storage: storage, fileFilter: imageFilter, limits:{files: maxUploadImgCount, fileSize: maxUploadFileSize} }).any();

    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        services.uploadProductImages(req.params.id, req.files);
        res.send('Ok');
    });
}

exports.findOneProductImage = (req, res) => {  
    services.getProductImage(req.params.id)    
    .then( (result) => {
        if (result) {

            res.sendFile(process.cwd() + '\\' + result.filename);    
        }
        else {
            res.status(404).send('Object not found')
        }
    }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}

exports.deleteOneImage = (req, res) => {  

    services.deleteProductImage(req.params.id)    
    .then( (result) => {
        if (result) {
            res.send(result);    
        }
        else {
            res.status(404).send('Object not found')
        }
    }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}