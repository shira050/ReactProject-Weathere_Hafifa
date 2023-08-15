import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [soliders, setSoliders] = useState([]);

  const updateUser = (newUser) => {
    setCurrentUser(newUser);
  };

  const updateSoliders = (soliders) => {
    debugger
    soliders=soliders.sort((s1, s2)=>{return s2.Age-s1.Age});
    soliders.sort((a, b)=> {
      return a.Last_Name.localeCompare(b.Last_Name) ||
             a.First_Name.localeCompare(b.First_Name)
  });
 
    setSoliders(soliders);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser,soliders, updateSoliders }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
