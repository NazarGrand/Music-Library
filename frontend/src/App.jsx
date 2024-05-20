import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { useContext, useEffect, useState } from "react";
import { StateTrackContext } from "./context/MusicContext";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import Loader from "./components/Loader/Loader";

function App() {
  const { trackName } = useContext(StateTrackContext);
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      setLoading(false);
    };

    fetchData();
  }, [fetchUser]);

  return (
    <>
      {user ? (
        <>
          <div className="app">
            <Sidebar />
            <div className="app__page">
              <div className="app__info">
                <AppRoutes />
              </div>
              <Footer />
            </div>
          </div>
          {trackName && <MusicPlayer />}
        </>
      ) : (
        <>{loading ? <Loader /> : <AppRoutes />}</>
      )}
    </>
  );
}

export default App;
