import { useLocation } from "react-router-dom";
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Login from "../../components/Login/Login";
import ActivationSuccess from "../../components/ActivationSuccess/ActivationSuccess";
import { useState } from "react";

const LoginPage = () => {
  const location = useLocation();
  const { userRegistered } = location.state || false;

  const [isRegistered, setIsRegistered] = useState(userRegistered);

  return (
    <>
      {isRegistered ? (
        <ActivationSuccess
          title="Registration Successful!"
          message="Please check your email to verify your account"
          isRegistered
          setIsRegistered={setIsRegistered}
        />
      ) : (
        <>
          <HeaderAuth type="login" />
          <Login />
        </>
      )}
    </>
  );
};

export default LoginPage;
