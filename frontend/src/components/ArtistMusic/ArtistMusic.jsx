import React from "react";
import "./ArtistMusic.scss";
import PopularArtistListTracks from "../PopularArtistListTracks/PopularArtistListTracks";
import AlbumCatalog from "../AlbumCatalog/AlbumCatalog";
import MusicCardsList from "../MusicCardsList/MusicCardsList";

const ArtistMusic = ({ popularTracks, albums, songs, playlists }) => {
  return (
    <div className="artist">
      <PopularArtistListTracks popularTracks={popularTracks} />

      <AlbumCatalog albumItems={albums} />

      <MusicCardsList cardItems={songs} type="artist-songs" />
    </div>
  );
};

export default ArtistMusic;
