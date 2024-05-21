import React from 'react'
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";

const SearchMessageView = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(
                            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                <Avatar
                                    mt="12px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                />
                            </Tooltip>
                        )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#FF99FF" : "#3399FF"}`,
                                marginLeft: "15px",
                                marginTop: "10px",
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
}

export default SearchMessageView