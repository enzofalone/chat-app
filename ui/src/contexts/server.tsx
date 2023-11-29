import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import { API_BASE_URL } from '../constants';
import { UserContext, UserContextContent } from './user';
import { Server, User } from '../common/types';
import { ApiServer } from '../service/apiServer';

interface Props {
  children: any;
}

export type ServerContextContent = {
  serverList: Server[];
  setServerList: Dispatch<Server[]>;
  fetchingServer: boolean;
  setSelectedServer: Dispatch<Server>;
  selectedServer: Server | undefined;
  handleOnChangeServer: Function;
  createServer: Function;
  generateLink: Function;
  consumeInviteLink: Function;
};

export const ServerContext: any = createContext<ServerContextContent>({
  serverList: [],
  setServerList: () => {},
  fetchingServer: false,
  setSelectedServer: () => {},
  selectedServer: undefined,
  handleOnChangeServer: () => {},
  createServer: Function,
  generateLink: () => {},
  consumeInviteLink: () => {},
});

const apiServer = new ApiServer(API_BASE_URL);

export const ServerContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [serverList, setServerList] = useState<Server[]>([]);
  const [fetchingServer, setFetchingServer] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>();

  const { user } = useContext<UserContextContent>(UserContext);

  const fetchServers = async () => {
    if (user._id || user) {
      setFetchingServer(true);

      try {
        const receivedServerList = await apiServer.getAll();

        setServerList(receivedServerList.data || []);
        setSelectedServer(receivedServerList.data[0]);
      } catch (error: unknown) {
        console.error(error);
      }

      setFetchingServer(false);
    }
  };

  const createServer = async (serverName: string) => {
    try {
      const newServer = await apiServer.create(serverName);

      if (newServer) {
        // append to user list
        setServerList((prevServers: Server[]) => [
          ...prevServers,
          newServer.data,
        ]);

        // select server
        setSelectedServer(newServer.data);

        // TODO: create a toast that displays it was created
        return { success: true };
      }
    } catch (error: unknown) {
      console.error(error);
    }
    return { success: false };
  };

  const handleOnChangeServer = (newServer: Server) => {
    setSelectedServer(newServer);
  };

  const generateLink = async () => {
    if (!selectedServer?.id) {
      console.error('No server ID');
      return;
    }

    return 'http://localhost:5173/join/' + selectedServer.id;
  };

  const consumeInviteLink = async (workspaceId: string) => {
    try {
      const response = await apiServer.join(workspaceId);
      console.log(response);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };


  useEffect(() => {
    if (user._id) {
      if (window.location.pathname.includes('/join/')) {
        const splitPath = window.location.pathname.split('/');
        const newWorkspaceId = splitPath[splitPath.length - 1];

        consumeInviteLink(newWorkspaceId);
        
        window.location.replace("http://localhost:5173")
      }
      fetchServers();
    }
  }, [user]);

  const contextValues: ServerContextContent = {
    selectedServer,
    setSelectedServer,
    fetchingServer,
    serverList,
    setServerList,
    handleOnChangeServer,
    createServer,
    generateLink,
    consumeInviteLink,
  };

  return (
    <ServerContext.Provider value={contextValues}>
      {children}
    </ServerContext.Provider>
  );
};
