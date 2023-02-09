import { motion } from "framer-motion";
import { FC } from "react";
import { User } from "../App";
import googleSignInImageSrc from "../assets/btn_google_signin.png";

type Props = {
  user: User;
  openGoogleSignIn: () => void;
  isUsernameDone: boolean;
};

const NoRoomScreen: FC<Props> = ({
  user,
  openGoogleSignIn,
  isUsernameDone,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center place-items-center">
      <span className="text-4xl text-center">
        {!isUsernameDone
          ? `Welcome! Please sign in with google and select a room to begin chatting! 🕺`
          : `Welcome ${user?.username}, please select a room to begin chatting!`}
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
        {/*   <form onSubmit={handleOnSubmitUsername}>
          <input
            className="rounded-md p-3 text-lg "
            disabled={isUsernameDone}
            type={"text"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Username"}
          />
          {!isUsernameDone ? (
            <input
              type={"submit"}
              className={
                "p-3 mx-5 text-lg rounded-md bg-green-600 cursor-pointer hover:bg-green-700 ease-in-out"
              }
            />
          ) : (
            <></>
          )}
        </form> */}
      </div>
    </div>
  );
};

export default NoRoomScreen;
