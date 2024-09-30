import { useLocation } from "react-router-dom";
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Login from "../../components/Login/Login";
import ActivationSuccess from "../../components/ActivationSuccess/ActivationSuccess";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const location = useLocation();
  const { userRegistered } = location.state || false;

  const [isRegistered, setIsRegistered] = useState(userRegistered);

  const { t } = useTranslation();
  return (
    <>
      {isRegistered ? (
        <ActivationSuccess
          title={t("registrationSuccessful")}
          message={t("verifyEmailMessage")}
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
