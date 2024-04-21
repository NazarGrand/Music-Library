import axios from "axios";

const options = {
  method: "GET",
  url: "https://spotify81.p.rapidapi.com/top_200_tracks",
  headers: {
    "X-RapidAPI-Key": "ec0785e3ccmsh1ea5cee02fdacc3p1fc185jsna8790c59c7be",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

export const getWeekTopChart = async () => {
  const responce = await axios.request(options);
  return responce.data;
};
