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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
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

  useEffect(() => {
    axios("http://localhost:3000/all-contests")
      .then((res) => {
        setContests(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
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
    contests,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
