import cloudinary from "../lib/cloudinary";
import Message from "../models/message.model";
import User from "../models/user.model";

export const getUsersForSidebar = async (req: any, res: any) => {
  try {
    const loggedInUserId = req.user._id;
    const filterdUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterdUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req: any, res: any) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
     const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    console.log('messages', messages)
    res.status(200).json(messages);
    
  } catch (error) {
    console.log("Error in getMessages controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessages = async (req: any, res: any) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl
    })

    await newMessage.save()
    console.log('newMessage', newMessage)
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in getMessages controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
