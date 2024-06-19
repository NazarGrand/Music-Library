import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { useContext, useEffect, useState } from "react";
import {
  DispatchTrackContext,
  StateTrackContext,
} from "./context/MusicContext";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader/Loader";
import { musicContextActions } from "./constants/MusicContextActions";
import { DispatchPlaylistContext } from "./context/PlayListContext";
import { playlistContextActions } from "./constants/PlaylistContextActions";
import i18next from "i18next";

import i18n from "./i18n/i18n";
import { StateFavouriteTracksContext } from "./context/FavouriteTracksContext";

function App() {
  const { trackName } = useContext(StateTrackContext);
  const { favouriteTracks } = useContext(StateFavouriteTracksContext);

  console.log(favouriteTracks);

  const dispatch = useContext(DispatchTrackContext);
  const dispatchPlaylist = useContext(DispatchPlaylistContext);

  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetchUser();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: musicContextActions.setTrack,
      payload: {
        trackId: null,
        trackName: null,
        trackAuthor: null,
        trackImage: null,
      },
    });

    dispatch({
      type: musicContextActions.setTrackUrl,
      payload: {
        trackUrl: null,
      },
    });

    dispatch({
      type: musicContextActions.setVolume,
      payload: {
        trackVolume: 70,
        trackPrevVolume: 70,
      },
    });

    dispatchPlaylist({
      type: playlistContextActions.setCurrentIndexTrackPlaying,
      payload: {
        currentIndexTrackPlaying: null,
      },
    });

    dispatchPlaylist({
      type: playlistContextActions.setPlaylist,
      payload: {
        playlistTracks: [],
      },
    });
  }, [user]);

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
