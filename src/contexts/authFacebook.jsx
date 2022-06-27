import { getAuth, getRedirectResult, FacebookAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { app } from "../services/FirebaseConfig";
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const provider = new FacebookAuthProvider();
  
export const AuthFacebookContext = createContext({});

export const AuthFacebookProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  
  function signInWithFacebook() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthFacebookContext.Provider
      value={{
        signed: !!user,
        user,
        signInWithFacebook,
        signOut,
      }}
    >
      {children}
    </AuthFacebookContext.Provider>
  );
};
  