import api from "./AxiosService";

export const getTrackAudio = async (id) => {
  return await api.get(`/listen-music/${id}`);
};

export const incrementTrackListens = async (id) => {
  return await api.post(`/listen-music/${id}`);
};
