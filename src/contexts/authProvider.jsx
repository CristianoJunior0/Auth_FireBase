import { AuthEmailProvider } from "./authEmail";
import { AuthGoogleProvider } from "./authGoogle";
import { AuthFacebookProvider } from "./authFacebook";

const AuthProvider=({children})=>{
    <AuthEmailProvider>
        <AuthFacebookProvider>
        <AuthGoogleProvider>
        {children}
        </AuthGoogleProvider>
        </AuthFacebookProvider>
    </AuthEmailProvider>
}

export default AuthProvider;