import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { useContext, useEffect, useState } from "react";
import { StateTrackContext } from "./context/MusicContext";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader/Loader";

function App() {
  const { trackName } = useContext(StateTrackContext);
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetchUser();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              {user.role === "user" && <Footer />}
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
