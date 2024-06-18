import { ROUTES } from "../utils/routes";

import iconHome from "../assets/images/Home.svg";
import iconAlbum from "../assets/images/Album.svg";
import iconArtists from "../assets/images/Artists.svg";
import iconRecentlyAdded from "../assets/images/RecentlyAdded.svg";
import iconMostPlayed from "../assets/images/MostPlayed.svg";
import iconYourFavorites from "../assets/images/YourFavorites.svg";

export const MenuItems = [
  {
    link: ROUTES.HOME,
    icon: iconHome,
    routeName: "Home",
    title: "titleHome",
  },
  {
    link: ROUTES.ALBUMS,
    icon: iconAlbum,
    routeName: "Albums",
    title: "titleAlbums",
  },
  {
    link: ROUTES.ARTISTS,
    icon: iconArtists,
    routeName: "Artists",
    title: "titleArtists",
  },
];

export const LibraryItems = [
  {
    link: ROUTES.RECENTLY_ADDED,
    icon: iconRecentlyAdded,
    routeName: "Recently added",
    title: "titleRecentlyAdded",
  },
  {
    link: ROUTES.MOST_PLAYED,
    icon: iconMostPlayed,
    routeName: "Most played",
    title: "titleMostPlayed",
  },
  {
    link: ROUTES.FAVOURITES,
    icon: iconYourFavorites,
    routeName: "Favorites",
    title: "titleFavourites",
  },
];
