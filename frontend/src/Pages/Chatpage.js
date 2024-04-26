import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fethChats = async () => {
    const { data } = await axios.get("/api/chat");

    setChats(data);
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
