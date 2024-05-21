import { useCreateMyUSer } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateMyUSer();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER:", user);
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
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
