import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { AuthFacebookContext } from "../../contexts/authFacebook";
import { AuthEmailContext } from "../../contexts/authEmail";

export const Home = () => {
  const { user, signOut } = useContext(AuthGoogleContext, AuthFacebookContext, AuthEmailContext);
  let userLogado = JSON.parse(user);
  console.log(userLogado);
  
  return (
    <div>
      {//<h1>Bem vindo: {userLogado.displayName}</h1>
      //<button onClick={() => signOut()}>sair</button>
    }
    </div>
  );
};
