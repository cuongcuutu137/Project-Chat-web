import React from 'react'
import axios from 'axios'

const Chatpage = () => {
   const fethChats = async () => {
     const data = await axios.get("/api/chat");
     console.log(data);
};

return <div>Chat page</div>;
};

export default Chatpage
