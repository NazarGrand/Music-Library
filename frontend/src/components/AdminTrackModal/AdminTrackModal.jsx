import "./AdminTrackModal.scss";
import imgExit from "../../assets/images/Exit.svg";
import imgLoader from "../../assets/images/Loader.svg";
import { useEffect, useState } from "react";
import AdminFileInput from "../AdminFileInput/AdminFileInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imgAddPhoto from "../../assets/images/AddImage.svg";

const AdminTrackModal = ({
  closeModal,
  selectedTrack,
  setSelectedTrack,
  onCreate,
  onUpdate,
  onDelete,
  albums,
  artists,
}) => {
  const formDefaultValues = {
    name: "",
    previewImage: null,
    audio: null,
    duration: "",
    releaseDate: new Date(),
    label: "",
  };

  const [trackData, setTrackData] = useState(formDefaultValues);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);

  const [isDisabledCreate, setIsDisabledCreate] = useState(false);
  const [isDisabledUpdate, setIsDisabledUpdate] = useState(false);
  const [isDisabledDelete, setIsDisabledDelete] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTrack) {
      setTrackData(selectedTrack);
      if (selectedTrack.albumReference) {
        setSelectedOption("album");
      } else if (selectedTrack.artistReference) {
        setSelectedOption("artist");
      }
    } else {
      setTrackData(formDefaultValues);
    }
  }, [selectedTrack]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setTrackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;

    let anotherSelect;
    if (name === "albumReference") {
      anotherSelect = "artistReference";
    } else {
      anotherSelect = "albumReference";
    }

    setTrackData((prev) => ({
      ...prev,
      [name]: value,
      [anotherSelect]: null,
    }));
  };

  const handleClose = () => {
    setSelectedTrack(null);
    closeModal();
  };

  const hangleDateChange = (date) => {
    setTrackData({
      ...trackData,
      releaseDate: date,
    });
  };

  const validateAllTrack = () => {
    if (
      trackData.name !== "" &&
      isAudioUploaded &&
      trackData.duration !== "" &&
      trackData.releaseDate
    ) {
      return true;
    }
    return false;
  };

  const handleCreate = async () => {
    if (!validateAllTrack()) {
      setError("Not all fields are filled");
      return;
    }

    setIsDisabledCreate(true);
    try {
      await onCreate(trackData);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsDisabledCreate(false);
    }
  };

  const handleUpdate = async () => {
    if (!validateAllTrack()) {
      setError("Not all fields are filled");
      return;
    }

    setIsDisabledUpdate(true);
    try {
      await onUpdate(trackData);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsDisabledUpdate(false);
    }
  };

  const handleDelete = async () => {
    setIsDisabledDelete(true);
    try {
      await onDelete(trackData._id);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsDisabledDelete(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="track-modal" onClick={handleClose}>
      <div className="track-modal__window" onClick={(e) => e.stopPropagation()}>
        <button className="track-modal__close" onClick={handleClose}>
          <img src={imgExit} alt="exit" />
        </button>

        <div className="track-modal__block">
          <p className="track-modal__title">Track Info</p>

          <div className="track-modal__block-info">
            <div className="track-modal__image-block">
              {!trackData.previewImage ? (
                <img src={imgAddPhoto} alt="addPhoto" />
              ) : (
                <img
                  className="track-modal__image"
                  src={trackData.previewImage}
                  alt="track name"
                />
              )}

              <AdminFileInput
                fileField="previewImage"
                accept="image/*"
                trackData={trackData}
                setTrackData={setTrackData}
                isUploadedFile={isImageUploaded}
                setIsUploadedFile={setIsImageUploaded}
                setError={setError}
              />
            </div>

            <div className="track-modal__details">
              <div className="track-modal__field-track">
                <p className="track-modal__detail">Type track:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="name"
                  placeholder="Name Track"
                  value={trackData.name}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">Track Name:</p>
                <div className="track-modal__option-area">
                  <label className="track-modal__option-title">
                    <input
                      type="radio"
                      name="option"
                      value="album"
                      checked={selectedOption === "album"}
                      onChange={handleOptionChange}
                    />{" "}
                    Album
                  </label>

                  <label className="track-modal__option-title">
                    <input
                      type="radio"
                      name="option"
                      value="artist"
                      checked={selectedOption === "artist"}
                      onChange={handleOptionChange}
                    />{" "}
                    Artist
                  </label>
                </div>
              </div>

              {selectedOption === "album" && (
                <div className="track-modal__field-track">
                  <p className="track-modal__detail">Album:</p>

                  <select
                    className="track-modal__select"
                    name="albumReference"
                    value={trackData.albumReference}
                    onChange={handleChangeSelect}
                  >
                    <option value={undefined}>Not Album</option>
                    {albums.map((album) => (
                      <option key={album._id} value={album._id}>
                        {album.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOption === "artist" && (
                <div className="track-modal__field-track">
                  <p className="track-modal__detail">Artist:</p>

                  <select
                    className="track-modal__select"
                    name="artistReference"
                    value={trackData.artistReference}
                    onChange={handleChangeSelect}
                  >
                    <option value={undefined}>Not Artist</option>
                    {artists.map((artist) => (
                      <option key={artist._id} value={artist._id}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="track-modal__field-track">
                <p className="track-modal__detail">Audio:</p>
                <AdminFileInput
                  fileField="audio"
                  accept="audio/*"
                  trackData={trackData}
                  setTrackData={setTrackData}
                  isUploadedFile={isAudioUploaded}
                  setIsUploadedFile={setIsAudioUploaded}
                  setError={setError}
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">Release Date:</p>

                <DatePicker
                  selected={trackData.releaseDate}
                  onChange={hangleDateChange}
                  calendarStartDay={1}
                  dateFormat="dd/MM/yyyy"
                  isClearable={true}
                  className="track-modal__datepicker-input"
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">Label:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="label"
                  placeholder="Label"
                  value={trackData.label}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">Duration:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  value={trackData.duration}
                  onChange={handleInput}
                  required={true}
                />
              </div>
            </div>
          </div>

          <p className="track-modal__error-message">{error}</p>
        </div>

        <div className="track-modal__block-buttons">
          {selectedTrack ? (
            <>
              <button
                className="track-modal__button"
                onClick={handleUpdate}
                disabled={isDisabledUpdate}
              >
                {!isDisabledUpdate && "Update Track"}
                <img
                  className="track-modal__image-loading"
                  src={imgLoader}
                  alt="loader"
                  style={{ display: isDisabledUpdate ? "block" : "none" }}
                />
              </button>

              <button
                className="track-modal__button"
                onClick={handleDelete}
                disabled={isDisabledDelete}
              >
                {!isDisabledDelete && "Delete Track"}
                <img
                  className="track-modal__image-loading"
                  src={imgLoader}
                  alt="loader"
                  style={{ display: isDisabledDelete ? "block" : "none" }}
                />
              </button>
            </>
          ) : (
            <button
              className="track-modal__button"
              onClick={handleCreate}
              disabled={isDisabledCreate}
            >
              {!isDisabledCreate && "Add Track"}
              <img
                className="track-modal__image-loading"
                src={imgLoader}
                alt="loader"
                style={{ display: isDisabledCreate ? "block" : "none" }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTrackModal;
