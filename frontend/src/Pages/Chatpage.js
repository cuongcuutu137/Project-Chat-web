import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fethChats = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fethChats();
  }, []);

  return (
    <div>
      {chats.map((t) => (
        <div key={t._id}>{t.chatName}</div>
      ))}
    </div>
  );
};

export default Chatpage;
