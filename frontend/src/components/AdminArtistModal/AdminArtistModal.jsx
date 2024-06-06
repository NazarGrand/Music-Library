import { useEffect, useState } from "react";
import "./AdminArtistModal.scss";
import * as artistService from "../../services/ArtistService";
import imgExit from "../../assets/images/Exit.svg";
import imgAddPhoto from "../../assets/images/AddImage.svg";
import imgTrack from "../../assets/images/Track.jpg";
import imgLoader from "../../assets/images/Loader.svg";
import classNames from "classnames";
import Loader from "../Loader/Loader";
import AdminFileInput from "../AdminFileInput/AdminFileInput";

const AdminArtistModal = ({
  closeModal,
  selectedArtist,
  setSelectedArtist,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const formDefaultValues = {
    name: "",
    photoUrl: null,
  };

  const [artistData, setArtistData] = useState(formDefaultValues);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDisabledCreate, setIsDisabledCreate] = useState(false);
  const [isDisabledUpdate, setIsDisabledUpdate] = useState(false);
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);

  const [error, setError] = useState("");

  const fetchArtistDetails = async (id) => {
    try {
      setLoading(true);
      const artistDetails = await artistService.getArtist(id);
      setArtistData(artistDetails.data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (selectedArtist) {
      fetchArtistDetails(selectedArtist._id);
    } else {
      setLoading(false);
      setArtistData(formDefaultValues);
    }
  }, [selectedArtist]);

  const modal = classNames("artist-modal__window", {
    "artist-modal__window--add": !selectedArtist,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setArtistData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setSelectedArtist(null);
    closeModal();
  };

  const validateAllAlbum = () => {
    if (artistData.name) {
      return true;
    }
    return false;
  };

  const handleCreate = async () => {
    if (!validateAllAlbum()) {
      setError("Not all fields are filled");
      return;
    }

    setIsDisabledCreate(true);
    try {
      await onCreate(artistData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDisabledCreate(false);
    }
  };

  const handleUpdate = async () => {
    if (!validateAllAlbum()) {
      setError("Not all fields are filled");
      return;
    }

    setIsDisabledUpdate(true);
    try {
      await onUpdate(artistData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDisabledUpdate(false);
    }
  };

  const handleDelete = async () => {
    setIsDisabledDelete(true);
    try {
      await onDelete(artistData._id);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDisabledDelete(false);
    }
  };

  return (
    <div className="artist-modal" onClick={handleClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <button className="artist-modal__close" onClick={handleClose}>
              <img src={imgExit} alt="exit" />
            </button>
            <div className="artist-modal__block">
              <p className="artist-modal__title">Artist Info</p>

              <div className="artist-modal__block-info">
                <div className="artist-modal__image-block">
                  {!artistData.photoUrl ? (
                    <img
                      className="artist-modal__image"
                      src={imgAddPhoto}
                      alt="addPhoto"
                    />
                  ) : (
                    <img
                      className="artist-modal__image"
                      src={artistData.photoUrl}
                      alt="album name"
                    />
                  )}

                  <AdminFileInput
                    fileField="photoUrl"
                    accept="image/*"
                    trackData={artistData}
                    setTrackData={setArtistData}
                    isUploadedFile={isImageUploaded}
                    setIsUploadedFile={setIsImageUploaded}
                    setError={setError}
                  />
                </div>

                <div className="artist-modal__details">
                  <div className="artist-modal__field-album">
                    <p className="artist-modal__detail">Artist Name:</p>

                    <input
                      className="artist-modal__input"
                      type="text"
                      name="name"
                      placeholder="Name Artist"
                      value={artistData.name}
                      onChange={handleInput}
                      required={true}
                    />
                  </div>

                  {artistData.albums && (
                    <div className="artist-modal__field-album">
                      <p className="artist-modal__detail">Albums:</p>
                      <div className="artist-modal__records">
                        {artistData.albums.length !== 0 ? (
                          artistData.albums.map((album) => (
                            <div
                              key={album._id}
                              className="artist-modal__block-record"
                            >
                              <img
                                className="artist-modal__icon-record"
                                src={
                                  album.previewImage
                                    ? album.previewImage
                                    : imgTrack
                                }
                                alt="img"
                              />
                              <p className="artist-modal__record">
                                {album.name}
                              </p>
                            </div>
                          ))
                        ) : (
                          <span className="artist-modal__record">
                            Not albums
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {artistData.singleSongs && (
                    <div className="artist-modal__field-album">
                      <p className="artist-modal__detail">Tracks:</p>
                      <div className="artist-modal__records">
                        {artistData.singleSongs.length !== 0 ? (
                          artistData.singleSongs.map((track) => (
                            <div
                              key={track._id}
                              className="artist-modal__block-record"
                            >
                              <img
                                className="artist-modal__icon-record"
                                src={
                                  track.previewImage
                                    ? track.previewImage
                                    : imgTrack
                                }
                                alt="img"
                              />
                              <p className="artist-modal__record">
                                {track.name}
                              </p>
                            </div>
                          ))
                        ) : (
                          <span className="artist-modal__record">
                            Not tracks
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="artist-modal__error-message">{error}</p>
            </div>

            <div className="artist-modal__block-buttons">
              {selectedArtist ? (
                <>
                  <button
                    className="artist-modal__button"
                    onClick={handleUpdate}
                    disabled={isDisabledUpdate}
                  >
                    {!isDisabledUpdate && "Update Album"}
                    <img
                      className="artist-modal__image-loading"
                      src={imgLoader}
                      alt="loader"
                      style={{ display: isDisabledUpdate ? "block" : "none" }}
                    />
                  </button>

                  <button
                    className="artist-modal__button"
                    onClick={handleDelete}
                    disabled={isDisabledDelete}
                  >
                    {!isDisabledDelete && "Delete Album"}
                    <img
                      className="artist-modal__image-loading"
                      src={imgLoader}
                      alt="loader"
                      style={{ display: isDisabledDelete ? "block" : "none" }}
                    />
                  </button>
                </>
              ) : (
                <button
                  className="artist-modal__button"
                  onClick={handleCreate}
                  disabled={isDisabledCreate}
                >
                  {!isDisabledCreate && "Add Album"}
                  <img
                    className="artist-modal__image-loading"
                    src={imgLoader}
                    alt="loader"
                    style={{ display: isDisabledCreate ? "block" : "none" }}
                  />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminArtistModal;
