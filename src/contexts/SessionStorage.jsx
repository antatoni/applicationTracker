import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      const userUid = authService.getUserUid();

      setSession({
        token,
        userUid,
      });
    }
    setLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
