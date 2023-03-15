import { FC, ChangeEvent, LegacyRef, SyntheticEvent } from "react";

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
    <div className="w-[100%] h-[100%] flex-1 bg-[#1c1c24]">
      <form
        ref={inputRef}
        className="flex h-[100%] py-3 justify-center"
        onSubmit={handleOnSend}
      >
        <input
          className={"flex-grow bg-gray-800 rounded-md py-3 px-3 my-auto mx-5 border-[1px] border-gray-700 active:border-gray-600"}
          type={"text"}
          placeholder={"Send a message!"}
          name={"message"}
          autoFocus={true}
          value={inputValue}
          autoComplete={'off'}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default ChatInput;
