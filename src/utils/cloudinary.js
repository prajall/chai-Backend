import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  const response = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
    })
    .catch((err) => {
      console.log("error on file upload: ", err);
      fs.unlinkSync(localFilePath);
      return null;
    });
  console.log("file uploaded on cloudinary");
  console.log("response: ", response.original_filename);
  console.log("url: ", response.url);

  return response;
};

export { uploadOnCloudinary };
