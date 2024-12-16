"use client";
import { createContext, ReactNode, useState } from "react";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  confirmed: boolean;
}

export const UserLoggedContext = createContext<{
  loggedUser: User | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ loggedUser: null, setLoggedUser: () => {} });

export function UserLoggedContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  return (
    <UserLoggedContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserLoggedContext.Provider>
  );
}
