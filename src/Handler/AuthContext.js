import React, { useContext, useEffect, useState } from "react";
import { auth, perf } from "../Firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const trace = perf.trace("queryTrace");
  trace.start();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    const Register = auth.createUserWithEmailAndPassword(email, password);

    return Register;
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    signup,
    logout,
  };
  trace.stop();
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
