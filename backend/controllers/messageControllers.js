const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateMessage = asyncHandler(async (req, res) => {
  const { messageId, newContent } = req.body;
  if (!messageId || !newContent) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { content: newContent },
      { new: true }
    )
      .populate("sender", "name pic")
      .populate("chat");

    if (!message) {
      return res.sendStatus(404);
    }

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.body;

  if (!messageId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
      return res.sendStatus(404);
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages, updateMessage, deleteMessage };
