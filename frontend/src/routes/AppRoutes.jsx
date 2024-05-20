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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
    <Route path={ROUTES.ARTISTS} element={<ArtistsPage />} />
    <Route path={ROUTES.ALBUMS} element={<AlbumsPage />} />
    <Route path={ROUTES.FAVOURITES} element={<FavouriteTracksPage />} />
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
