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
import { Image } from "@chakra-ui/react";
import Moment from "react-moment";

const ScrollableChat = ({ messages }) => {
  console.log(messages);
  const { user } = ChatState();
  const endMessage = useRef(null);
  const picture = useRef(null);
  const [showImg, setShowImg] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const reviewImage = (pic) => {
    setShowImg(true);
    picture.current = pic;
  };

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  }, [messages]);

  const isShowDate = () => {
    if (showDate === false) setShowDate(true);
    else setShowDate(false);
  };

  return (
    <>
      {showImg ? (
        <div className="chatContainer" onClick={() => setShowImg(false)}>
          <div className="imgContent">
            <Image src={picture.current} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {showDate === true ? (
              <>
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
              </>
            ) : (
              <></>
            )}

            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
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
                <span
                  style={{
                    backgroundColor: `${
                      m.sender._id === user._id ? "#339999" : "#3399FF"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: m.content.includes("res.cloudinary.com")
                      ? "0"
                      : "5px 15px",
                    maxWidth: m.content.includes("res.cloudinary.com")
                      ? "50%"
                      : "75%",
                  }}
                >
                  <div>{m.content}</div>
                  <div>
                    <Moment className="datetime" format="HH:mm">
                      {m.createdAt}
                    </Moment>
                  </div>
                </span>
              </>
            ) : (
              <Image
                src={m.content}
                style={{
                  maxWidth: 200,
                  maxHeight: 250,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
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
