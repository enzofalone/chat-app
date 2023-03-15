import { FC } from "react";
import { MessageStatus } from "../../App";
import { convertTimestamp } from "../../utils/convertTimestamp";

type Props = {
  messageContent: string;
  messageDate: string;
  author: string | undefined;
  imageSrc: string | undefined;
  messageStatus: MessageStatus | undefined;
};

const ChatMessage: FC<Props> = ({
  messageContent,
  messageDate,
  author,
  imageSrc,
  messageStatus,
}) => {
  let textStatusColor = "text-[#fff]";

  if (messageStatus === MessageStatus.PENDING) {
    textStatusColor = "text-gray-400";
  } else if (messageStatus === MessageStatus.DELIVERED) {
    textStatusColor = "text-[#fff]";
  } else if (messageStatus === MessageStatus.ERROR) {
    textStatusColor = "text-red-600";
  }

  return (
    <>
      <div className="flex flex-row hover:bg-gray-800 py-3 px-3 ">
        {/* Author Image */}
        <div className="flex justify-center place-items-center">
          <div className="bg-black w-[40px] h-[40px] rounded-full">
            {imageSrc ? (
              <img className="rounded-full" src={imageSrc}></img>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col px-3">
          {/* Top component */}
          <div className="flex flex-row">
            {/* Title */}
            <span className="font-bold">{author || "Unnamed"}</span>
            {/* Date */}
            <span
              id={"date"}
              className={`font-light text-gray-600 text-sm px-2 mt-[0.1rem] hover:text-gray-300`}
            >
              {convertTimestamp(messageDate) || "00/00/0000 00:00"}
            </span>
          </div>
          {/* Message content */}
          <div>
            <p className={`text-base ${textStatusColor}`}>{messageContent}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
