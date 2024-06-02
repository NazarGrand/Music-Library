import { ROUTES } from "../utils/routes";
import iconTrack from "../assets/images/Discover.svg";
import iconAlbum from "../assets/images/AlbumIcon.svg";
import iconArtists from "../assets/images/Artists.svg";

export const MenuItemsAdmin = [
  {
    link: ROUTES.ADMIN_TRACKS,
    icon: iconTrack,
    title: "Tracks",
  },
  {
    link: ROUTES.ADMIN_ALBUMS,
    icon: iconAlbum,
    title: "Albums",
  },
  {
    link: ROUTES.ADMIN_ARTISTS,
    icon: iconArtists,
    title: "Artists",
  },
];
