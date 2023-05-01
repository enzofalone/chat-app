import { motion } from "framer-motion";
import { FC } from "react";
import googleSignInImageSrc from "../assets/btn_google_signin.png";
import { User } from "../common/types";

type Props = {
  user: User;
  openGoogleSignIn: () => void;
  isUsernameDone: boolean;
};

const NoChannelScreen: FC<Props> = ({
  user,
  openGoogleSignIn,
  isUsernameDone,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center place-items-center">
      <span className="text-4xl text-center">
        {!isUsernameDone
          ? `Welcome! Please sign in with google and select a channel to begin chatting! 🕺`
          : `Welcome ${user?.username}, please create a server or join one to begin chatting!`}
      </span>
      <div className="mt-10">
        {/* google sign in */}
        {!isUsernameDone ? (
          <motion.img
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={"max-w-[300px] cursor-pointer"}
            onClick={openGoogleSignIn}
            src={googleSignInImageSrc}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NoChannelScreen;
