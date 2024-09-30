import api from "./AxiosService";

export const createAlbum = async (albumData) => {
  return await api.post("/albums", albumData);
};

export const getAlbum = async (id) => {
  return await api.get(`/albums/${id}`);
};

export const getAllAlbums = async () => {
  return await api.get("/albums");
};

export const updateAlbum = async (id, albumData) => {
  return await api.put(`/albums/${id}`, albumData);
};

export const deleteAlbum = async (id) => {
  return await api.delete(`/albums/${id}`);
};
