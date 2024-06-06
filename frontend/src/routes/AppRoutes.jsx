import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import HomePage from "../pages/Home/HomePage";
import DiscoverPage from "../pages/Discover/DiscoverPage";
import ArtistsPage from "../pages/Artists/ArtistsPage";
import ErrorPage from "../pages/Error/ErrorPage";
import AlbumsPage from "../pages/Albums/AlbumsPage";
import FavouriteTracksPage from "../pages/FavouriteTracksPage/FavouriteTracksPage";
import LoginPage from "../pages/Login/LoginPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import AccountActivatedPage from "../pages/AccountActivated/AccountActivatedPage";
import { ROLE } from "../constants/Roles";
import { useAuth } from "../context/AuthContext";
import AdminTracksPage from "../pages/AdminTracks/AdminTracksPage";
import AdminAlbumsPage from "../pages/AdminAlbums/AdminAlbumsPage";
import AdminArtistsPage from "../pages/AdminArtists/AdminArtistsPage";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user && user.role === ROLE.USER && (
        <>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
          <Route path={ROUTES.ARTISTS} element={<ArtistsPage />} />
          <Route path={ROUTES.ALBUMS} element={<AlbumsPage />} />
          <Route path={ROUTES.FAVOURITES} element={<FavouriteTracksPage />} />
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
