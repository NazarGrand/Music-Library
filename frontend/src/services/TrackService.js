import axios from "axios";

const options = {
  method: "GET",
  url: "https://spotify81.p.rapidapi.com/download_track",
  params: {
    onlyLinks: "1",
  },
  headers: {
    "X-RapidAPI-Key": "ec0785e3ccmsh1ea5cee02fdacc3p1fc185jsna8790c59c7be",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

export const getTrackUrl = async (titleSong, titleAuthor) => {
  const response = await axios.request({
    ...options,
    params: {
      ...options.params,
      q: `${titleSong} ${titleAuthor}`,
    },
  });

  const dataArray = response.data;

  if (dataArray.length === 0) {
    return null;
  }

  return dataArray[0];
};
