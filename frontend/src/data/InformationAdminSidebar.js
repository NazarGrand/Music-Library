import { ROUTES } from "../utils/routes";
import iconTrack from "../assets/images/Discover.svg";
import iconAlbum from "../assets/images/Album.svg";
import iconArtists from "../assets/images/Artists.svg";

export const MenuItemsAdmin = [
  {
    link: ROUTES.ADMIN_TRACKS,
    icon: iconTrack,
    routeName: "Tracks",
    title: "tracks",
  },
  {
    link: ROUTES.ADMIN_ALBUMS,
    icon: iconAlbum,
    routeName: "Albums",
    title: "titleAlbums",
  },
  {
    link: ROUTES.ADMIN_ARTISTS,
    icon: iconArtists,
    routeName: "Artists",
    title: "titleArtists",
  },
];
