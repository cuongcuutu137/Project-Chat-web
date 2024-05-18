import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { Button } from "@chakra-ui/react";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", medium: "flex" }}
      flexDir="column"
      alignItems="center"
      padding={3}
      background="white"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      height="100%"
      backgroundImage="https://q8laser.com/wp-content/uploads/2022/07/hinh-nen-cam-on-2.png"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box
        padding-bottomb={3}
        paddingX={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        paddingY={2}
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            width={{ base: "auto", md: "auto", lg: "200px" }}
            backgroundColor="#FFFFCC"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        padding={3}
        background="#F8F8F8"
        width="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                background={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                paddingX={3}
                paddingY={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
