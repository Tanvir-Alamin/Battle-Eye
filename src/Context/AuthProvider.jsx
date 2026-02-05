import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const google = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const userWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const mailLogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => getUser();
  }, []);
  const authInfo = {
    google,
    user,
    setUser,
    logOut,
    userWithEmail,
    mailLogIn,
    loading,
    setLoading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
