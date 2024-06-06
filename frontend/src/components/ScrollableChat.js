import React, { useEffect, useState, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Image, IconButton, Input, Box } from "@chakra-ui/react";
import Moment from "react-moment";
import axios from "axios";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import "./styles.css";

const ScrollableChat = ({ messages, setMessages }) => {
  const { user } = ChatState();
  const endMessage = useRef(null);
  const picture = useRef(null);
  const [showImg, setShowImg] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newMessage, setNewMessage] = useState(messages);
  const toast = useToast();

  const reviewImage = (pic) => {
    setShowImg(true);
    picture.current = pic;
  };

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  }, [newMessage]);

  const isShowDate = () => {
    setShowDate(!showDate);
  };

  const handleEditMessage = async (messageId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/message/update",
        { messageId, newContent: editContent },
        config
      );

      setNewMessage((newMessage) =>
        newMessage.map((msg) =>
          msg._id === messageId ? { ...msg, content: data.content } : msg
        )
      );
      setIsEditing(null);
      setEditContent("");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to update the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete("/api/message/delete", {
        data: { messageId },
        ...config,
      });
      setNewMessage((newMessage) =>
        newMessage.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to delete the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      {showImg ? (
        <div className="chatContainer" onClick={() => setShowImg(false)}>
          <div className="imgContent">
            <Image src={picture.current} />
          </div>
        </div>
      ) : null}
      {newMessage &&
        newMessage.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {showDate && (
              <Moment
                style={{
                  backgroundColor: "#d0d3d6",
                  margin: "10px",
                  borderRadius: "10px",
                  padding: "10px 15px 5px 15px",
                  maxWidth: "75%",
                }}
                format="DD/MM/YYYY"
              >
                {m.createdAt}
              </Moment>
            )}

            {(isSameSender(newMessage, m, i, user._id) ||
              isLastMessage(newMessage, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            {m.content.includes("res.cloudinary.com") === false ? (
              <>
                {isEditing === m._id ? (
                  <Box
                    style={{
                      backgroundColor: "#f1f1f1",
                      marginLeft: isSameSenderMargin(newMessage, m, i, user._id),
                      marginTop: isSameUser(newMessage, m, i, user._id) ? 3 : 10,
                      borderRadius: "20px",
                      padding: "5px 15px",
                      maxWidth: "75%",
                    }}
                  >
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleEditMessage(m._id);
                      }}
                    />
                    <IconButton
                      bg="#C0C0C0"
                      size="sm"
                      icon={<CheckIcon />}
                      onClick={() => handleEditMessage(m._id)}
                    />
                  </Box>
                ) : (
                  <span
                    style={{
                      backgroundColor: `${m.sender._id === user._id ? "#339999" : "#3399FF"
                        }`,
                      marginLeft: isSameSenderMargin(newMessage, m, i, user._id),
                      marginTop: isSameUser(newMessage, m, i, user._id) ? 3 : 10,
                      borderRadius: "20px",
                      padding: "5px 15px",
                      maxWidth: "75%",
                    }}
                    onClick={() => isShowDate()}
                  >
                    <div>{m.content}</div>
                    <div>
                      <Moment className="datetime" format="HH:mm">
                        {m.createdAt}
                      </Moment>
                    </div>
                  </span>
                )}
                {m.sender._id === user._id && (
                  <div className="message-buttons">
                    <IconButton
                      bg="#C0C0C0"
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => {
                        setIsEditing(m._id);
                        setEditContent(m.content);
                      }}
                    />
                    <IconButton
                      bg="#C0C0C0"
                      size="sm"
                      icon={<CloseIcon />}
                      onClick={() => handleDeleteMessage(m._id)}
                    />
                  </div>
                )}
              </>
            ) : (
              <Image
                src={m.content}
                style={{
                  maxWidth: 200,
                  maxHeight: 250,
                  marginLeft: isSameSenderMargin(newMessage, m, i, user._id),
                  marginTop: isSameUser(newMessage, m, i, user._id) ? 3 : 10,
                  borderRadius: "10px",
                }}
                onClick={() => reviewImage(m.content)}
              />
            )}
            <div ref={endMessage} />
          </div>
        ))}
    </>
  );
};

export default ScrollableChat;
