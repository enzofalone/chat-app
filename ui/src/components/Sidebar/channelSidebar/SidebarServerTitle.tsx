import { motion } from 'framer-motion';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { ServerContext, ServerContextContent } from '../../../contexts/server';

type Props = {
  title: string | undefined;
};

function SidebarServerTitle({ title }: Props) {
  return (
    <div className="w-full flex justify-start bg-[#16141f] px-2 py-4 border-b-[1px] border-r-[1px] border-gray-700 min-h-[60px] max-h-[60px]">
      <span className="text-center text-lg mx-3 font-bold py-auto">
        {title || 'Unnamed'}
      </span>
      <div className="ml-auto flex align-middle">
        <InviteUserButton />
        <ServerSettingsButton />
      </div>
    </div>
  );
}

const InviteUserButton = () => {
  const {generateLink} = useContext<ServerContextContent>(ServerContext);

  const notify = () => {
    toast.success('Copied workspace invite link to clipboard!');
  };

  const generateInviteLink = async () => {
    const link = await generateLink();    
    navigator.clipboard.writeText(link);
    notify();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-slate-800 p-2 pt-[5px] pl-[6px] rounded-md ml-auto  hover:bg-slate-700 active:bg-slate-600 transition-colors duration-200 max-w-[27px]"
      onClick={generateInviteLink}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="18"
        viewBox="0 0 576 512"
      >
        <path
          fill="#b5b5b5"
          d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z"
        />
      </svg>
    </motion.button>
  );
};

const ServerSettingsButton = () => {
  const notify = () => {
    toast.error("Coming soon ™️")
  }
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-slate-800  ml-1 rounded-md mr-3 h-[27px] w-[27px] hover:bg-slate-700 active:bg-slate-600 transition-colors duration-200 flex justify-center pt-[3.5px]"
    onClick={notify}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        viewBox="0 0 512 512"
      >
        <path
          fill="#b8b8b8"
          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
        />
      </svg>
    </motion.button>
  );
};
export default SidebarServerTitle;
