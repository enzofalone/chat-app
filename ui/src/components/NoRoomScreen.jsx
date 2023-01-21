import React from "react";

function NoRoomScreen({
    username,
    setUsername,
    handleOnSubmitUsername,
    isUsernameDone,
}) {
    return (
        <div className="w-full h-full flex flex-col justify-center place-items-center">
            <span className="text-4xl text-center">
                Welcome! Please enter a name below and select a room to begin
                chatting! 🕺
            </span>
            <div className="mt-10">
                <form onSubmit={handleOnSubmitUsername}>
                    <input
                        className="rounded-md p-3 text-lg "
                        disabled={isUsernameDone}
                        htmlFor={"username"}
                        type={"text"}
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
                </form>
            </div>
        </div>
    );
}

export default NoRoomScreen;
