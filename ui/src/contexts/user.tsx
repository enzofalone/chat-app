import axios from "axios";
import { Context, createContext, Dispatch, useEffect, useState } from "react";
import { User } from "../App";
import { API_BASE_URL } from "../constants";
import { ApiClient, Method } from "../service/apiClient";
import { ApiUser } from "../service/apiUser";

interface Props {
  children: any;
}

export type UserContextContent = {
  user: User;
  setUser: Dispatch<User>;
  fetchingUser: boolean;
  logOutUser: () => void;
};

export const UserContext: any = createContext<UserContextContent>({
  user: {},
  setUser: () => {},
  fetchingUser: false,
  logOutUser: () => {},
});

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>({});
  const [fetchingUser, setFetchingUser] = useState(false);

  const apiUser = new ApiUser();

  const fetchUser = async () => {
    setFetchingUser(true);

    try {
      const response = await apiUser.getUser();

      if (response.data) {
        setUser(response.data.user);
      }
    } catch (error) {}

    setFetchingUser(false);
  };

  const logOutUser = async () => {
    setFetchingUser(true);

    const response = await apiUser.logOutUser();
    window.location.reload();

    setFetchingUser(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValues = { user, setUser, fetchingUser, logOutUser };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
