import React, { FC } from "react";

type Props = {
  title: string;
};

const ChatHeader: FC<Props> = ({ title }: Props) => {
  return (
    <div className="w-full flex justify-start py-3 border-b-[1px] align-middle border-gray-700 bg-[#1c1c24] min-h-[52px] max-h-[52px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-hash ml-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 9l14 0"></path>
        <path d="M5 15l14 0"></path>
        <path d="M11 4l-4 16"></path>
        <path d="M17 4l-4 16"></path>
      </svg>
      <span className="text-middle text-lg font-bold self-baseline align-middle leading-snug">
        {title || ""}
      </span>
    </div>
  );
};

export default ChatHeader;
