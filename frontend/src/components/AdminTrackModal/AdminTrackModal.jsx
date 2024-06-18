import "./AdminTrackModal.scss";
import imgExit from "../../assets/images/Exit.svg";
import imgLoader from "../../assets/images/Loader.svg";
import { useEffect, useState } from "react";
import AdminFileInput from "../AdminFileInput/AdminFileInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imgAddPhoto from "../../assets/images/AddImage.svg";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      if (selectedTrack.albumReference) {
        setSelectedOption("album");
        selectedTrack.artistReference = null;
      } else if (selectedTrack.artistReference) {
        setSelectedOption("artist");
      }
      setTrackData(selectedTrack);
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
          <p className="track-modal__title">{t("trackInfo")}</p>

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
                <p className="track-modal__detail">{t("trackName")}:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="name"
                  placeholder={t("trackName")}
                  value={trackData.name}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">{t("typeTrack")}:</p>
                <div className="track-modal__option-area">
                  <label className="track-modal__option-title">
                    <input
                      type="radio"
                      name="option"
                      value="album"
                      checked={selectedOption === "album"}
                      onChange={handleOptionChange}
                    />{" "}
                    {t("album")}
                  </label>

                  <label className="track-modal__option-title">
                    <input
                      type="radio"
                      name="option"
                      value="artist"
                      checked={selectedOption === "artist"}
                      onChange={handleOptionChange}
                    />{" "}
                    {t("artist")}
                  </label>
                </div>
              </div>

              {selectedOption === "album" && (
                <div className="track-modal__field-track">
                  <p className="track-modal__detail">{t("album")}:</p>

                  <select
                    className="track-modal__select"
                    name="albumReference"
                    value={
                      trackData.albumReference
                        ? trackData.albumReference
                        : undefined
                    }
                    onChange={handleChangeSelect}
                  >
                    <option value={undefined}>{t("notAlbum")}</option>
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
                  <p className="track-modal__detail">{t("artist")}:</p>

                  <select
                    className="track-modal__select"
                    name="artistReference"
                    value={
                      trackData.artistReference
                        ? trackData.artistReference
                        : undefined
                    }
                    onChange={handleChangeSelect}
                  >
                    <option value={undefined}>{t("notArtist")}</option>
                    {artists.map((artist) => (
                      <option key={artist._id} value={artist._id}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="track-modal__field-track">
                <p className="track-modal__detail">{t("audio")}:</p>
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
                <p className="track-modal__detail">{t("releaseDate")}:</p>

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
                <p className="track-modal__detail">{t("label")}:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="label"
                  placeholder={t("label")}
                  value={trackData.label}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              <div className="track-modal__field-track">
                <p className="track-modal__detail">{t("duration")}:</p>

                <input
                  className="track-modal__input"
                  type="text"
                  name="duration"
                  placeholder={t("duration")}
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
                {!isDisabledUpdate && `${t("update")} ${t("track")}`}
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
                {!isDisabledDelete && `${t("delete")} ${t("track")}`}
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
              {!isDisabledCreate && t("addTrack")}
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
