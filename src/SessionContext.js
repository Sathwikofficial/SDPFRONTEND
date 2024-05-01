// SessionContext.js
import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setSession = (userData) => {
    setUser(userData);
  };

  const clearSession = () => {
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession };
