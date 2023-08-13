import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [soliders, setSoliders] = useState([]);

  const updateUser = (newUser) => {
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser,soliders, setSoliders }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
