// import { useCreateMyUSer } from "@/api/MyUserApi";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  // const { createUser } = useCreateMyUSer();
  //the above part will be pasted in AuthCallbackPage.tsx

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = () => {
    // if (user?.sub && user?.email) {
    //   createUser({ auth0Id: user.sub, email: user.email });
    // }
    //the above part is removed because the auth0 hook cannot be used here for accesstoken since this components is a level higher than the auth0Provider. so a new compoenent will be created that wil have access to the auth0 hook
    //hence, whenever the user is redirected here, first it will redirect to /auth-callback where the new user will be created and again redirected to the homepage
    //in this way, MyUserApi will be able to gain access to access token
    navigate("/auth-callback");
  };
  //when the user is redirected after successful login
  //onRedirectCallback will handle whatever we need
  //like getting user info from user:User, current url like appState
  //and so on

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
