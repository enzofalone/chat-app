import { Button, Input, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { ChangeEvent, Dispatch, useState } from 'react';
import { API_BASE_URL } from '../../../constants';
import { Channel } from '../../../common/types';

type Props = {
  serverId: string | undefined;
  handleOnChangeChannel: Function;
  setChannelList: Dispatch<any>; // TODO: remove any
};

function CreateChannelButton({
  serverId,
  handleOnChangeChannel,
  setChannelList,
}: Props) {
  const [openedModal, { open, close }] = useDisclosure(false);
  const [channelName, setChannelName] = useState('');

  const handleOnCreateChannel = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serverId) return;
    //TODO: create toast regarding no serverId

    try {
      // TODO: MOVE ALL THIS TO CONTEXT AA
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        channelName: channelName,
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
        title="Create new channel"
        centered
      >
        {/* Modal content */}
        <form
          className="flex flex-col justify-start  "
          onSubmit={handleOnCreateChannel}
        >
          <div className="my-4 flex flex-col">
            <TextInput
              label={'Channel Name'}
              placeholder={'Awesome Channel'}
              className="text-slate-100 p-3 text-md"
              value={channelName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setChannelName(e.target.value);
              }}
            />
          </div>
          <Button type="submit" variant='filled' color="indigo" className='min-w-[100px] m-auto'>
            Create!
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default CreateChannelButton;
