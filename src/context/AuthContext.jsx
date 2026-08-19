import {createContext, useState} from "react";

export const AuthContext = createContext();

// Hardcoded user credentials for demonstration purposes
const users = [
  {id: 1, email: "jeypack2014@gmail.com", password: "undWiedaEinPasswort123%", name: "Jörg Pfeifer"},
  {id: 2, email: "john-doe@gmail.com", password: "undEins23%", name: "John Doe"},
];

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // const userData = await api.login(email, password);
    let userData = null;
    await new Promise((resolve) => {
      const foundUser = users.find((u) => u.email === email && u.password === password);
      if (foundUser) {
        userData = foundUser;
      }
      return setTimeout(resolve, 1000);
    });
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
