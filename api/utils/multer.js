import multer from "multer";

// create diskstrage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname.toLowerCase().split(" ").join("-")
    );
  },
  destination: (req, file, cb) => {
    if (file.fieldname == "userphoto") {
      cb(null, "public/userphoto");
    } else if (file.fieldname == "post") {
      cb(null, "public/post");
    }
  },
});

export const userPhotoMulter = multer({ storage }).single("userphoto");

export const postMulter = multer({ storage }).single("post");
