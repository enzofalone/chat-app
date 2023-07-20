import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_BASE_URL } from "../constants";
import { UserContext, UserContextContent } from "./user";
import { Server } from "../common/types";
import { ApiServer } from "../service/apiServer";

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
};

export const ServerContext: any = createContext<ServerContextContent>({
  serverList: [],
  setServerList: () => {},
  fetchingServer: false,
  setSelectedServer: () => {},
  selectedServer: undefined,
  handleOnChangeServer: () => {},
  createServer: Function,
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


        // TODO: change to a success/error message more descriptive
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

  useEffect(() => {
    if (user._id) {
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
  };

  return (
    <ServerContext.Provider value={contextValues}>
      {children}
    </ServerContext.Provider>
  );
};
