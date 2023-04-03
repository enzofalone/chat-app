import { Context, createContext, Dispatch, useState } from "react";
import { User } from "../App";

interface Props {
  children: any;
}

export type UserContextContent = {
  user: User;
  setUser: Dispatch<User>;
};

export const UserContext: any = createContext<UserContextContent>({
  user: {},
  setUser: () => {},
});

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>({});
  const contextValues = { user, setUser };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
