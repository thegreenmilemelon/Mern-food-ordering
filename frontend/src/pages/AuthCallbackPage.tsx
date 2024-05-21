import { useCreateMyUSer } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUSer();
  const hasCreatedUser = useRef(false);

  //hasCreatedUser is used just to be sure that the useEffect is called just once. useRef mean even after state changes it will not incurr re-render
  //we have updated the hasCreatedUser within the useEffect but it will trigger the re-render again and fetching the createUser

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    //after the createUser or after the useEffect is run, the page will redirect to homepage
    navigate("/");
  }, [createUser, navigate, user]);
  return <>Loading.....</>;
};

export default AuthCallbackPage;
