import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [soliders, setSoliders] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const updateSoliders = (_soliders) => {
    const temp = _soliders.toSorted((a, b)=> {
      return a.Last_Name.localeCompare(b.Last_Name) ||
             a.First_Name.localeCompare(b.First_Name)
  });
 
    setSoliders(temp);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser,soliders, updateSoliders,selectedCards, setSelectedCards }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
