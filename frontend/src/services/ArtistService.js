import api from "./AxiosService";

export const createArtist = async (artistData) => {
  return await api.post("/artists", artistData);
};

export const getArtist = async (id) => {
  return await api.get(`/artists/${id}`);
};

export const getAllArtists = async () => {
  return await api.get("/artists");
};

export const updateArtist = async (id, artistData) => {
  return await api.put(`/artists/${id}`, artistData);
};

export const deleteArtist = async (id) => {
  return await api.delete(`/artists/${id}`);
};

export const getPopularSongs = async (id) => {
  return await api.get(`/artists/popular-songs/${id}`);
};
