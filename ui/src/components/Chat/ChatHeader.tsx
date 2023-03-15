import React, { FC } from "react";

type Props = {
  title: string;
};

const ChatHeader: FC<Props> = ({ title }: Props) => {
  return (
    <div className="w-full flex justify-start  py-3 border-b-[1px] border-gray-700 bg-[#1c1c24]">
      <span className="text-center text-lg mx-3 px-2 font-bold">{title}</span>
    </div>
  );
};

export default ChatHeader;
