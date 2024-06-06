const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  sendMessage,
  allMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageControllers");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);
router.route("/update").put(protect, updateMessage);
router.route("/delete").delete(protect, deleteMessage);
module.exports = router;
