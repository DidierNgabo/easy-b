import multer from 'multer';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('-');
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${name}${Date.now()}.${extension}`);
  },
});

const multerSet = multer({ storage }).single('image');
export default multerSet;
