const multer = require('multer');

const upload = multer ({
    dest: function (req, file, cb) {
        cb(null, './public/assets/help_files')
      },
    limits: {
        fileSize: 500000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx|jpg|jpeg|png|pdf)$/)) {
            return cb(new Error('plese upload an image or pdf or documnet'))
        }
        cb(undefined, true)
    }
})

module.exports = upload