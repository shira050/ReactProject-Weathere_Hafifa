import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const updateUser = (newUser) => {
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
