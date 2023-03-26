import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { ChangeEvent, Dispatch, useState } from "react";
import { Channel } from "../../../App";
import { API_BASE_URL } from "../../../constants";

type Props = {
  serverId: string | undefined;
  handleOnChangeChannel: (newChannel: Channel) => void;
  setChannelList: Dispatch<any>; // TODO: remove any
};

function CreateChannelButton({
  serverId,
  handleOnChangeChannel,
  setChannelList,
}: Props) {
  const [openedModal, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState({
    channelName: "",
  });

  const handleOnCreateChannel = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serverId) return;
    //TODO: create toast regarding no serverId

    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        channelName: inputs.channelName,
        serverId,
      };

      const newChannel = await axios.post(
        `${API_BASE_URL}/channel/`,
        data,
        config
      );

      if (newChannel.data) {
        handleOnChangeChannel(newChannel.data);
        setChannelList((prevList: Channel[]) => {
          return [...prevList, newChannel.data];
        });
        close();
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <div
        className={`px-2 py-1 my-1 
       cursor-pointer
      rounded-md font-bold hover:bg-slate-700`}
        onClick={open}
      >
        <span>Create a channel</span>
      </div>
      <Modal
        opened={openedModal}
        onClose={close}
        title="Create new channel 😮😮"
        centered
      >
        {/* Modal content */}
        <form
          className="flex flex-col justify-start  "
          onSubmit={handleOnCreateChannel}
        >
          {Object.entries(inputs).map(([category, value], idx) => {
            return (
              <div key={category} className="my-4 flex flex-col">
                <h3>{category}</h3>
                <input
                  key={idx}
                  name={category}
                  value={value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputs({ ...inputs, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            );
          })}
          <Button type="submit" color="indigo">
            Create!
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default CreateChannelButton;
