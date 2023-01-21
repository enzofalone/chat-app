import React from "react";

function ChatHeader({ title = "Chat App" }) {
    return (
        <div className="w-full flex justify-start  py-3 border-b-2 border-gray-900 bg-gray-800">
            <span className="text-center text-lg mx-3 px-2 font-bold">
                {title}
            </span>
        </div>
    );
}

export default ChatHeader;
