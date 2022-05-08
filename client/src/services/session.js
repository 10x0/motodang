import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext({});

function SessionProvider({ children }) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState();

  const sessionContextValue = useMemo(() => {
    return {
      session,
      saveSession: (s) => {
        if (s) {
          localStorage.setItem("session", s ? JSON.stringify(s) : "{}");
        } else {
          localStorage.removeItem("session");
        }

        setSession(s);
        (s === undefined || s.user.role === "admin") && navigate("/");
      },
      verifySession: () => session?.token !== undefined,
    };
  }, [session, navigate]);

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem("__session__") ?? "{}"));
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  return useContext(SessionContext);
}

export { useSession, SessionProvider };
