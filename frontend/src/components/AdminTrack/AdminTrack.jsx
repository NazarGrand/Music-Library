import "./AdminTrack.scss";
import { formatDurationTrack } from "../../utils/formatDurationTrack";
import imgTrack from "../../assets/images/Track.jpg";
import { formatDate } from "../../utils/formatDateTrack";

const AdminTrack = ({ indexTrack, track, openModal, setSelectedTrack }) => {
  const { name, previewImage, releaseDate, label, duration } = track;

  const durationSong = formatDurationTrack(duration);
  const releaseDateTrack = formatDate(releaseDate);

  const handleTrackClick = () => {
    setSelectedTrack(track);
    openModal();
  };

  const trackImage = previewImage ? previewImage : imgTrack;

  return (
    <div className="admin-track">
      <span className="admin-track__index-track">#{indexTrack}</span>

      <div className="admin-track__container">
        <div className="admin-track__block-title">
          <button className="admin-track__button" onClick={handleTrackClick}>
            <img
              className="admin-track__image"
              src={trackImage}
              alt="imgTrack"
            />
          </button>

          <div className="admin-track__title">
            <button className="admin-track__button" onClick={handleTrackClick}>
              <span className="admin-track__title-song">{name}</span>
            </button>
          </div>
        </div>

        <p className="admin-track__relase-date">{releaseDateTrack}</p>

        <p className="admin-track__label">{label}</p>

        <p className="admin-track__time">{durationSong}</p>
      </div>
    </div>
  );
};

export default AdminTrack;
