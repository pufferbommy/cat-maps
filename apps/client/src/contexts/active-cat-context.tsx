import { createContext, ReactNode, useState } from "react";

interface ActiveCatContext {
  id: string;
  setId: (id: string) => void;
}

export const ActiveCatContext = createContext<ActiveCatContext | null>(null);

interface ActiveCatContextProviderProps {
  children: ReactNode;
}

export const ActiveCatContextProvider = ({
  children,
}: ActiveCatContextProviderProps) => {
  const [id, setId] = useState("");

  return (
    <ActiveCatContext.Provider value={{ id, setId }}>
      {children}
    </ActiveCatContext.Provider>
  );
};
