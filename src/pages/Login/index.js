import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { AuthFacebookContext } from "../../contexts/authFacebook";
import { AuthEmailContext } from "../../contexts/authEmail";

export const Login = () => {
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();

  const { signInGoogle, signed: signedWithGoogle } = useContext(AuthGoogleContext);
  const { signInWithFacebook, signed: signedWithFacebook } = useContext(AuthFacebookContext);
  const { signInWithEmail, signed: signedWithEmail } = useContext(AuthEmailContext);
  const { createUserWithEmail } = useContext(AuthEmailContext);

  async function handleLogin(method) {
    if (method === 'google'){
      await signInGoogle();
    } else if (method === 'facebook'){
      await signInWithFacebook();
    } else if (method === 'emailLogin'){
      await signInWithEmail(email,password);
    } else if (method === 'emailCreate'){
      await createUserWithEmail(email,password);
    } else {
      return
    }
  }
  


  if (!signedWithGoogle && !signedWithFacebook && !signedWithEmail) {
    return (
      <div>
        <input type='email' placeholder="email" onChange={(ev)=>setEmail(ev.target.value)}  />
        <input type='password' placeholder="senha" onChange={(ev)=>setPassword(ev.target.value)}  />
        <button onClick={()=>handleLogin('emailLogin')}>logar com email</button>
        <button onClick={()=>handleLogin('emailCreate')}>criar conta com email</button>
        <button onClick={()=>handleLogin('google')}>Logar com o Google</button>
        <button onClick={()=>handleLogin('facebook')}>Logar com o Facebook</button>
      </div>
    );
  } else {
    return <Navigate to="/Home" />;
  }
};
