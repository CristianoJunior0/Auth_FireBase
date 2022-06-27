import { useState, createContext, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../services/FirebaseConfig";
import { Navigate } from "react-router-dom";


export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
const auth = getAuth();
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
},[]);


function createUserWithEmail(email,password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user = userCredential.user;
    //signInWithEmail(email,password);
    return user;
  })
  .catch(error=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  }) 
}  

function signInWithEmail(email,password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.accessToken;
    
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthEmailContext.Provider
      value={{
        signed: !!user,
        user,
        createUserWithEmail,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthEmailContext.Provider>
  );
};
