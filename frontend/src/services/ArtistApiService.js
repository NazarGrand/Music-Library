import axios from "axios";

const options = {
  method: "GET",
  url: "https://spotify81.p.rapidapi.com/artist_overview",
  headers: {
    "X-RapidAPI-Key": "ec0785e3ccmsh1ea5cee02fdacc3p1fc185jsna8790c59c7be",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

export const getArtist = async (idArtist) => {
  const response = await axios.request({
    ...options,
    params: {
      id: idArtist,
    },
  });

  const data = response.data.data.artist;

  return data;
};
