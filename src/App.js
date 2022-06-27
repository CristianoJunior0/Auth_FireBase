import { AuthEmailProvider } from "./contexts/authEmail";
import { AuthGoogleProvider } from "./contexts/authGoogle";
import { AuthFacebookProvider } from "./contexts/authFacebook";
import { AppRoutes } from "./routes/routes";

export const App = () => {
  return (
    <AuthEmailProvider>
      <AuthFacebookProvider>
        <AuthGoogleProvider>
          <AppRoutes /> 
        </AuthGoogleProvider>
      </AuthFacebookProvider>
    </AuthEmailProvider>
  );
};
