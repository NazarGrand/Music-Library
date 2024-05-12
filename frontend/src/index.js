import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { MusicProvider } from "./context/MusicContext";
import { PlaylistProvider } from "./context/PlayListContext";
import { FavouriteTracksProvider } from "./context/FavouriteTracksContext";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <MusicProvider>
        <PlaylistProvider>
          <FavouriteTracksProvider>
            <App />
          </FavouriteTracksProvider>
        </PlaylistProvider>
      </MusicProvider>
    </BrowserRouter>
  </AuthProvider>
);
