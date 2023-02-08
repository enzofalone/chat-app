import React, { FC, SyntheticEvent } from "react";

type Props = {
  username: string;
  setUsername: (newUsername: string) => void;
  openGoogleSignIn: () => void;
  isUsernameDone: boolean;
};

const NoRoomScreen: FC<Props> = ({
  username,
  setUsername,
  openGoogleSignIn,
  isUsernameDone,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center place-items-center">
      <span className="text-4xl text-center">
        Welcome! Please sign in with google and select <br /> a room to begin
        chatting! 🕺
      </span>
      <div className="mt-10">
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
