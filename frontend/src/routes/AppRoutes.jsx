import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import HomePage from "../pages/Home/HomePage";
import DiscoverPage from "../pages/Discover/DiscoverPage";
import ErrorPage from "../pages/Error/ErrorPage";
import FavouriteTracksPage from "../pages/FavouriteTracksPage/FavouriteTracksPage";
import LoginPage from "../pages/Login/LoginPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import AccountActivatedPage from "../pages/AccountActivated/AccountActivatedPage";
import { ROLE } from "../constants/Roles";
import { useAuth } from "../context/AuthContext";
import AdminTracksPage from "../pages/AdminTracks/AdminTracksPage";
import AdminAlbumsPage from "../pages/AdminAlbums/AdminAlbumsPage";
import AdminArtistsPage from "../pages/AdminArtists/AdminArtistsPage";
import ArtistPage from "../pages/Artist/ArtistPage";
import ArtistsPage from "../pages/Artists/ArtistsPage";
import AlbumPage from "../pages/Album/AlbumPage";
import AlbumsPage from "../pages/Albums/AlbumsPage";
import RecentlyAddedPage from "../pages/RecentlyAdded/RecentlyAddedPage";
import MostPlayedPage from "../pages/MostPlayed/MostPlayedPage";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user && user.role === ROLE.USER && (
        <>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
          <Route exact path={ROUTES.ARTISTS} element={<ArtistsPage />} />
          <Route path={ROUTES.ARTIST} element={<ArtistPage />} />
          <Route exact path={ROUTES.ALBUMS} element={<AlbumsPage />} />
          <Route path={ROUTES.ALBUM} element={<AlbumPage />} />
          <Route path={ROUTES.FAVOURITES} element={<FavouriteTracksPage />} />
          <Route path={ROUTES.RECENTLY_ADDED} element={<RecentlyAddedPage />} />
          <Route path={ROUTES.MOST_PLAYED} element={<MostPlayedPage />} />
          <Route
            path={ROUTES.ACCOUNT_ACTIVATED}
            element={<AccountActivatedPage />}
          />
        </>
      )}

      {user && user.role === ROLE.ADMIN && (
        <>
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={ROUTES.ADMIN_TRACKS} />}
          />
          <Route path={ROUTES.ADMIN_TRACKS} element={<AdminTracksPage />} />
          <Route path={ROUTES.ADMIN_ALBUMS} element={<AdminAlbumsPage />} />
          <Route path={ROUTES.ADMIN_ARTISTS} element={<AdminArtistsPage />} />
        </>
      )}

      {!user && (
        <>
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        </>
      )}

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
