import { ROUTES } from "../utils/routes";

import iconHome from "../assets/images/Home.svg";
import iconDiscover from "../assets/images/Discover.svg";
import iconAlbum from "../assets/images/Album.svg";
import iconArtists from "../assets/images/Artists.svg";
import iconRecentlyAdded from "../assets/images/RecentlyAdded.svg";
import iconMostPlayed from "../assets/images/MostPlayed.svg";
import iconYourFavorites from "../assets/images/YourFavorites.svg";
import iconYourPlaylist from "../assets/images/YourPlaylist.svg";
import iconAddPlayList from "../assets/images/AddPlayList.svg";
import iconSetting from "../assets/images/Setting.svg";
import iconLogout from "../assets/images/Logout.svg";

export const MenuItems = [
  {
    link: ROUTES.HOME,
    icon: iconHome,
    title: "Home",
  },
  {
    link: ROUTES.DISCOVER,
    icon: iconDiscover,
    title: "Discover",
  },
  {
    link: ROUTES.ALBUMS,
    icon: iconAlbum,
    title: "Albums",
  },
  {
    link: ROUTES.ARTISTS,
    icon: iconArtists,
    title: "Artists",
  },
];

export const LibraryItems = [
  {
    link: "Recently added",
    icon: iconRecentlyAdded,
    title: "Recently added",
  },
  {
    link: "Most played",
    icon: iconMostPlayed,
    title: "Most played",
  },
];

export const FavoriteItems = [
  {
    link: ROUTES.FAVOURITES,
    icon: iconYourFavorites,
    title: "Favorites",
  },
  {
    link: "Your playlist",
    icon: iconYourPlaylist,
    title: "Playlist",
  },
  {
    link: "Add playlist",
    icon: iconAddPlayList,
    title: "Add playlist",
  },
];

export const GeneralItems = [
  {
    link: "Setting",
    icon: iconSetting,
    title: "Setting",
  },
  {
    link: "Logout",
    icon: iconLogout,
    title: "Logout",
  },
];
