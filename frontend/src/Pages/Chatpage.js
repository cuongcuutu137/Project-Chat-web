import React, { useEffect } from "react";
import axios from "axios";

const Chatpage = () => {
  const fethChats = async () => {
    const data = await axios.get("/api/chat");
    console.log(data);
  };

  useEffect(() => {
    fethChats();
  }, []);

  return <div>Chat page</div>;
};

export default Chatpage;
