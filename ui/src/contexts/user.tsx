import { createContext, Dispatch, useEffect, useState } from "react";
import { User } from "../App";
import { ApiUser } from "../service/apiUser";

interface Props {
  children: any;
}

export type UserContextContent = {
  user: User;
  setUser: Dispatch<User>;
  fetchingUser: boolean;
};

export const UserContext: any = createContext<UserContextContent>({
  user: {},
  setUser: () => {},
  fetchingUser: false,
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

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValues = { user, setUser, fetchingUser };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
