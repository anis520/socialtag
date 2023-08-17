import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dgbhheqgy",
  api_key: "146156465818285",
  api_secret: "vfQ0XsOQcVAVP0pSgwAHOWgeU_E",
});

export const uploadcloud = async (img) => {
  await cloudinary.uploader.upload(img.tempFilePath).then((result) => result);
};

export default cloudinary;
