import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Box } from "@chakra-ui/react";

const SearchMessageView = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <Box
              cursor="pointer"
              background="#E8E8E8"
              _hover={{
                background: "#38B2AC",
                color: "white",
              }}
              width="95%"
              marginX="15px"
              marginY="5px"
              display="flex"
              alignItems="center"
              color="black"
              px={2}
              py={3}
              borderRadius="lg"
            >
              {
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="12px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              }
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#CCCCCC" : "#CCCCCC"
                  }`,
                  marginLeft: "15px",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </Box>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default SearchMessageView;
