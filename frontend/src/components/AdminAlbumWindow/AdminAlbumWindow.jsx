import "./AdminAlbumWindow.scss";

import imgExit from "../../assets/images/Exit.svg";
import { useEffect, useState } from "react";
import AdminFileInput from "../AdminFileInput/AdminFileInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imgAddPhoto from "../../assets/images/AddImage.svg";
import classNames from "classnames";
import * as albumService from "../../services/AlbumService";
import Loader from "../Loader/Loader";

const AdminAlbumWindow = ({
  closeModal,
  selectedAlbum,
  setSelectedAlbum,
  onCreating,
  onUpdating,
  onDeleting,
}) => {
  const initialEmptyAlbum = {
    name: "",
    previewImage: null,
    releaseDate: new Date(),
  };

  const [albumData, setAlbumData] = useState(initialEmptyAlbum);
  const [isUploadedImage, setIsUploadedImage] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAlbumDetails = async (id) => {
    const albumDetails = await albumService.getAlbum(id);
    setAlbumData(albumDetails.data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedAlbum) {
      fetchAlbumDetails(selectedAlbum._id);
    } else {
      setAlbumData(initialEmptyAlbum);
    }
  }, [selectedAlbum]);

  console.log(albumData);

  const modal = classNames("album-window__modal", {
    "album-window__modal--add": !selectedAlbum,
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
    if (albumData.name !== "" && isUploadedImage && albumData.releaseDate) {
      return true;
    }
    return false;
  };

  const handleClickCreate = async () => {
    try {
      if (validateAllAlbum()) {
        await onCreating(albumData);
      } else {
        console.log("Validation wrong");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickUpdate = async () => {
    try {
      if (validateAllAlbum()) {
        await onUpdating(albumData);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickDelete = async () => {
    try {
      await onDeleting(albumData._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="album-window" onClick={handleClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <button className="album-window__close" onClick={handleClose}>
              <img src={imgExit} alt="exit" />
            </button>
            <div className="album-window__block">
              <p className="album-window__title">Album Info</p>

              <div className="album-window__block-info">
                <div className="album-window__image-block">
                  {!albumData.previewImage ? (
                    <img src={imgAddPhoto} alt="addPhoto" />
                  ) : (
                    <img
                      className="album-window__image"
                      src={albumData.previewImage}
                      alt="album name"
                    />
                  )}

                  <AdminFileInput
                    fileField="previewImage"
                    accept="image/*"
                    trackData={albumData}
                    setTrackData={setAlbumData}
                    isUploadedFile={isUploadedImage}
                    setIsUploadedFile={setIsUploadedImage}
                  />
                </div>

                <div className="album-window__details">
                  <div className="album-window__field-album">
                    <p className="album-window__detail">Album Name:</p>

                    <input
                      className="album-window__input"
                      type="text"
                      name="name"
                      placeholder="Name Album"
                      value={albumData.name}
                      onChange={handleInput}
                      required={true}
                    />
                  </div>
                  <div className="album-window__field-album">
                    <p className="album-window__detail">Release Date:</p>

                    <DatePicker
                      selected={albumData.releaseDate}
                      onChange={hangleDateChange}
                      calendarStartDay={1}
                      dateFormat="dd/MM/yyyy"
                      isClearable={true}
                      className="album-window__datepicker-input"
                    />
                  </div>

                  {albumData.tracksReferences && (
                    <div className="album-window__field-album">
                      <p className="album-window__detail">Tracks:</p>
                      <div className="album-window__tracks">
                        {albumData.tracksReferences.length !== 0 ? (
                          albumData.tracksReferences.map((track, index) => (
                            <div className="album-window__block-track">
                              <img
                                className="album-window__icon-track"
                                src={track.previewImage}
                                alt="img"
                              />
                              <p
                                key={track._id}
                                className="album-window__track"
                              >
                                {track.name}
                              </p>
                            </div>
                          ))
                        ) : (
                          <span className="album-window__track">
                            Not tracks
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="album-window__block-buttons">
              {selectedAlbum ? (
                <>
                  <button
                    className="album-window__button"
                    onClick={handleClickUpdate}
                  >
                    Update Album
                  </button>
                  <button
                    className="album-window__button"
                    onClick={handleClickDelete}
                  >
                    Delete Album
                  </button>
                </>
              ) : (
                <button
                  className="album-window__button"
                  onClick={handleClickCreate}
                >
                  Add Album
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAlbumWindow;
