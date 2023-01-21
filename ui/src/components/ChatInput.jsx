import React from "react";

function ChatInput({ inputValue, setInputValue, handleOnSend }) {
  return (
    <div className="w-[100%] h-[100%] flex-1 bg-gray-900">
      <form
        className="flex h-[100%] py-3 justify-center"
        onSubmit={handleOnSend}
      >
        <input
          className={"flex-grow bg-gray-700 rounded-md py-3 px-3 my-auto mx-5"}
          type={"text"}
          placeholder={"Send a message!"}
          name={"message"}
          autoFocus={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default ChatInput;
