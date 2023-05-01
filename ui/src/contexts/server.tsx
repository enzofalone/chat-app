import axios from "axios";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { Server } from "../App";
import { API_BASE_URL } from "../constants";
import { UserContext, UserContextContent } from "./user";

interface Props {
  children: any;
}

export type ServerContextContent = {
  serverList: Server[];
  setServerList: Dispatch<Server[]>;
  fetchingServer: boolean;
  setSelectedServer: Dispatch<Server>;
  selectedServer: Server | undefined;
};

export const ServerContext: any = createContext<ServerContextContent>({
  serverList: [],
  setServerList: () => {},
  fetchingServer: false,
  setSelectedServer: () => {},
  selectedServer: undefined,
});

export const ServerContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [serverList, setServerList] = useState<Server[]>([]);
  const [fetchingServer, setFetchingServer] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>();

  const { user } = useContext<UserContextContent>(UserContext);

  const fetchServers = async () => {
    if (user._id || user) {
      setFetchingServer(true);

      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const receivedServerList = await axios.get(
          `${API_BASE_URL}/server`,
          config
        );

        setServerList(receivedServerList.data || []);
        setSelectedServer(receivedServerList.data[0]);
      } catch (error) {
        console.error(error);
      }

      setFetchingServer(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, [user]);

  const contextValues: ServerContextContent = {
    selectedServer,
    setSelectedServer,
    fetchingServer,
    serverList,
    setServerList,
  };

  return (
    <ServerContext.Provider value={contextValues}>
      {children}
    </ServerContext.Provider>
  );
};
