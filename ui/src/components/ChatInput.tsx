import React, { FC, ChangeEvent, LegacyRef, SyntheticEvent } from "react";

type Props = {
  inputValue: string;
  setInputValue: (newValue: string) => void;
  handleOnSend: (event: SyntheticEvent) => void;
  inputRef: LegacyRef<HTMLFormElement>;
};

const ChatInput: FC<Props> = ({
  inputValue,
  setInputValue,
  handleOnSend,
  inputRef,
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-[100%] h-[100%] flex-1 bg-gray-900">
      <form
        ref={inputRef}
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
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default ChatInput;
