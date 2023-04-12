import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { User } from "../types";

export interface AuthContextInterface {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextInterface>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

// context to store token and user data during the session
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = "AuthContext";
