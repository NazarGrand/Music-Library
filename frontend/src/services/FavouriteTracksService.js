import api from "./AxiosService";

export const getAllFavouriteTracks = async () => {
  return await api.get("/user-favourites/get-favourites");
};

export const getFavouriteTrackIds = async () => {
  return await api.get("/user-favourites/get-favourites-ids");
};

export const addTrackToFavourites = async (idTrack) => {
  return await api.post(`/user-favourites/${idTrack}`);
};

export const removeTrackFromFavourites = async (idTrack) => {
  return await api.delete(`/user-favourites/${idTrack}`);
};
