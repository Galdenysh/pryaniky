import { createContext, useContext } from "react";

interface ICurrentUser {
  username: string;
  loggedIn: boolean;
}

interface ICurrentUserContext {
  currentUser: ICurrentUser;
  setCurrentUser: (value: React.SetStateAction<ICurrentUser>) => void;
}

export const CurrentUserContext = createContext<ICurrentUserContext | null>(
  null,
);

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      'useCurrentUser has to be used within <CurrentUserContext.Provider>',
    );
  }

  return currentUserContext;
};