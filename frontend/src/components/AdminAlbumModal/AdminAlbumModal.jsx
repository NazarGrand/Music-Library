import "./AdminAlbumModal.scss";

import imgExit from "../../assets/images/Exit.svg";
import { useEffect, useState } from "react";
import AdminFileInput from "../AdminFileInput/AdminFileInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imgAddPhoto from "../../assets/images/AddImage.svg";
import imgTrack from "../../assets/images/Track.jpg";
import imgLoader from "../../assets/images/Loader.svg";
import classNames from "classnames";
import * as albumService from "../../services/AlbumService";
import Loader from "../Loader/Loader";

const AdminAlbumModal = ({
  closeModal,
  selectedAlbum,
  setSelectedAlbum,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const formDefaultValues = {
    name: "",
    previewImage: null,
    releaseDate: new Date(),
  };

  const [albumData, setAlbumData] = useState(formDefaultValues);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDisabledCreate, setIsDisabledCreate] = useState(false);
  const [isDisabledUpdate, setIsDisabledUpdate] = useState(false);
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);

  const [error, setError] = useState("");

  const fetchAlbumDetails = async (id) => {
    try {
      setLoading(true);
      const albumDetails = await albumService.getAlbum(id);
      setAlbumData(albumDetails.data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (selectedAlbum) {
      fetchAlbumDetails(selectedAlbum._id);
    } else {
      setLoading(false);
      setAlbumData(formDefaultValues);
    }
  }, [selectedAlbum]);

  const modal = classNames("album-modal__window", {
    "album-modal__window--add": !selectedAlbum,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setAlbumData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setSelectedAlbum(null);
    closeModal();
  };

  const hangleDateChange = (date) => {
    setAlbumData({
      ...albumData,
      releaseDate: date,
    });
  };

  const validateAllAlbum = () => {
    if (albumData.name !== "" && albumData.releaseDate) {
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
      await onCreate(albumData);
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
      await onUpdate(albumData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDisabledUpdate(false);
    }
  };

  const handleDelete = async () => {
    setIsDisabledDelete(true);
    try {
      await onDelete(albumData._id);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsDisabledDelete(false);
    }
  };

  return (
    <div className="album-modal" onClick={handleClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <button className="album-modal__close" onClick={handleClose}>
              <img src={imgExit} alt="exit" />
            </button>
            <div className="album-modal__block">
              <p className="album-modal__title">Album Info</p>

              <div className="album-modal__block-info">
                <div className="album-modal__image-block">
                  {!albumData.previewImage ? (
                    <img
                      className="album-modal__image"
                      src={imgAddPhoto}
                      alt="addPhoto"
                    />
                  ) : (
                    <img
                      className="album-modal__image"
                      src={albumData.previewImage}
                      alt="album name"
                    />
                  )}

                  <AdminFileInput
                    fileField="previewImage"
                    accept="image/*"
                    trackData={albumData}
                    setTrackData={setAlbumData}
                    isUploadedFile={isImageUploaded}
                    setIsUploadedFile={setIsImageUploaded}
                    setError={setError}
                  />
                </div>

                <div className="album-modal__details">
                  <div className="album-modal__field-album">
                    <p className="album-modal__detail">Album Name:</p>

                    <input
                      className="album-modal__input"
                      type="text"
                      name="name"
                      placeholder="Name Album"
                      value={albumData.name}
                      onChange={handleInput}
                      required={true}
                    />
                  </div>

                  <div className="album-modal__field-album">
                    <p className="album-modal__detail">Release Date:</p>

                    <DatePicker
                      selected={albumData.releaseDate}
                      onChange={hangleDateChange}
                      calendarStartDay={1}
                      dateFormat="dd/MM/yyyy"
                      isClearable={true}
                      className="album-modal__datepicker-input"
                    />
                  </div>

                  {albumData.tracksReferences && (
                    <div className="album-modal__field-album">
                      <p className="album-modal__detail">Tracks:</p>
                      <div className="album-modal__tracks">
                        {albumData.tracksReferences.length !== 0 ? (
                          albumData.tracksReferences.map((track) => (
                            <div
                              key={track._id}
                              className="album-modal__block-track"
                            >
                              <img
                                className="album-modal__icon-track"
                                src={
                                  track.previewImage
                                    ? track.previewImage
                                    : imgTrack
                                }
                                alt="img"
                              />
                              <p className="album-modal__track">{track.name}</p>
                            </div>
                          ))
                        ) : (
                          <span className="album-modal__track">Not tracks</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="album-modal__error-message">{error}</p>
            </div>

            <div className="album-modal__block-buttons">
              {selectedAlbum ? (
                <>
                  <button
                    className="album-modal__button"
                    onClick={handleUpdate}
                    disabled={isDisabledUpdate}
                  >
                    {!isDisabledUpdate && "Update Album"}
                    <img
                      className="album-modal__image-loading"
                      src={imgLoader}
                      alt="loader"
                      style={{ display: isDisabledUpdate ? "block" : "none" }}
                    />
                  </button>
                  <button
                    className="album-modal__button"
                    onClick={handleDelete}
                    disabled={isDisabledDelete}
                  >
                    {!isDisabledDelete && "Delete Album"}
                    <img
                      className="album-modal__image-loading"
                      src={imgLoader}
                      alt="loader"
                      style={{ display: isDisabledDelete ? "block" : "none" }}
                    />
                  </button>
                </>
              ) : (
                <button
                  className="album-modal__button"
                  onClick={handleCreate}
                  disabled={isDisabledCreate}
                >
                  {!isDisabledCreate && "Add Album"}
                  <img
                    className="album-modal__image-loading"
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

export default AdminAlbumModal;
