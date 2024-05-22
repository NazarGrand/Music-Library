import { useLocation } from "react-router-dom";
import ActivationSuccess from "../../components/ActivationSuccess/ActivationSuccess";
import * as authService from "../../services/AuthService";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ActivationError from "../../components/ActivationError/ActivationError";

const AccountActivatedPage = () => {
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
        <ActivationSuccess />
      ) : (
        <ActivationError errorMessage={error} />
      )}
    </>
  );
};

export default AccountActivatedPage;
