import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(`API Base URL: ${apiUrl}`);

  return (
    <>
      <HeaderAuth type="login" />
      <Login />
    </>
  );
};

export default LoginPage;
