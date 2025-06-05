import { profile } from "console";
import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary";

// signup
export const signup = async (req: any, res: any) => {
  const { fullName, email, password } = req.body;
  try {
    // hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller");
    res.status(500).json({ message: "Internet Server Error" });
  }
};

// LOGIN
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    generateToken(user._id.toString(), res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGOUT
export const logout = (req: any, res: any) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE PROFILE
export const updateProfile = async (req: any, res:any) => {
  try {
    const {profilePic} = req.body
    const userId =req.user._id 
    if (!profilePic) {
        return res.status(400).json({message: "Profile pic is required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
    res.status(200).json(updatedUser)
  } catch(error) {
    console.log("Error in update Profile Picture")
    res.status(500).json({message: "Internal Server Error"})
  }
};

//CHECK AUTH
export const checkAuth = async(req:any, res:any) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller")
    res.status(500).json({message: "Internal Server Error"})
    }
}
