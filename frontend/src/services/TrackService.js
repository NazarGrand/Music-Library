import api from "./AxiosService";

export const createTrack = async (trackData) => {
  return await api.post("/tracks", trackData);
};

export const getTrack = async (id) => {
  return await api.get(`/tracks/${id}`);
};

export const getAllTracks = async () => {
  return await api.get("/tracks");
};

export const updateTrack = async (id, trackData) => {
  return await api.put(`/tracks/${id}`, trackData);
};

export const deleteTrack = async (id) => {
  return await api.delete(`/tracks/${id}`);
};
