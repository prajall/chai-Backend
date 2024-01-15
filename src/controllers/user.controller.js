import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  const { fullName, userName, password, email } = req.body;

  if ((!fullName, !userName, !password, !email)) {
    throw new apiError("400", "All fields are required");
  }

  const existedUsername = User.findOne({ userName });
  const existedEmail = User.findOne({ email });

  if (existedEmail) {
    throw new apiError("409", "Email already exist");
  }
  if (existedUsername) {
    throw new apiError("409", "Username already exist");
  }

  const avatarImagePath = req.files["avatarImage"]?.path;
  const coverImagePath = req.files["coverImage"]?.path;

  const avatar = await uploadOnCloudinary(avatarImagePath);
  const coverImage = await uploadOnCloudinary(coverImagePath);

  if (!avatar) {
    throw new apiError("400", "Avatar is required");
  }

  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
  });
  const createdUser = User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new apiError("500", "Something went wrong while creating user");
  }

  res
    .status(200)
    .json(new apiResponse("200", "User created successfully", createdUser));
};

export { registerUser };
