import { useLocation } from "react-router-dom";
import ActivationSuccess from "../../components/ActivationSuccess/ActivationSuccess";
import * as authService from "../../services/AuthService";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useTranslation } from "react-i18next";

const AccountActivatedPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      await authService.verifyUser(token);
    } catch (e) {
      setError(e.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !error ? (
        <ActivationSuccess message={t("accountActivated")} />
      ) : (
        <Error errorMessage={error} type="email" />
      )}
    </>
  );
};

export default AccountActivatedPage;
