import "./AdminTrackWindow.scss";
import imgExit from "../../assets/images/Exit.svg";
import { useEffect, useState } from "react";
import AdminFileInput from "../AdminFileInput/AdminFileInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import imgAddPhoto from "../../assets/images/AddImage.svg";

const AdminTrackWindow = ({
  closeModal,
  selectedTrack,
  setSelectedTrack,
  onCreating,
  onUpdating,
  onDeleting,
}) => {
  const initialEmptyTrack = {
    name: "",
    previewImage: null,
    audio: null,
    duration: "",
    releaseDate: new Date(),
    label: "",
  };

  const [trackData, setTrackData] = useState(initialEmptyTrack);
  const [isUploadedImage, setIsUploadedImage] = useState(false);
  const [isUploadedAudio, setIsUploadedAudio] = useState(false);

  console.log(trackData);

  useEffect(() => {
    if (selectedTrack) {
      setTrackData(selectedTrack);
    } else {
      setTrackData(initialEmptyTrack);
    }
  }, [selectedTrack]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setTrackData((prev) => ({
      ...prev,
      [name]: value,
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
      isUploadedImage &&
      isUploadedAudio &&
      trackData.duration !== "" &&
      trackData.label !== "" &&
      trackData.releaseDate
    ) {
      return true;
    }
    return false;
  };

  const handleClickCreate = async () => {
    try {
      if (validateAllTrack()) {
        await onCreating(trackData);
      } else {
        console.log("Validation wrong");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickUpdate = async () => {
    try {
      if (validateAllTrack()) {
        await onUpdating(trackData);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClickDelete = async () => {
    try {
      await onDeleting(trackData._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="track-window" onClick={handleClose}>
      <div className="track-window__modal" onClick={(e) => e.stopPropagation()}>
        <button className="track-window__close" onClick={handleClose}>
          <img src={imgExit} alt="exit" />
        </button>

        <div className="track-window__block">
          <p className="track-window__title">Track Info</p>

          <div className="track-window__block-info">
            <div className="track-window__image-block">
              {!trackData.previewImage ? (
                <img src={imgAddPhoto} alt="addPhoto" />
              ) : (
                <img
                  className="track-window__image"
                  src={trackData.previewImage}
                  alt="track name"
                />
              )}

              <AdminFileInput
                fileField="previewImage"
                accept="image/*"
                trackData={trackData}
                setTrackData={setTrackData}
                isUploadedFile={isUploadedImage}
                setIsUploadedFile={setIsUploadedImage}
              />
            </div>

            <div className="track-window__details">
              <div className="track-window__field-track">
                <p className="track-window__detail">Track Name:</p>

                <input
                  className="track-window__input"
                  type="text"
                  name="name"
                  placeholder="Name Track"
                  value={trackData.name}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              {trackData.album && (
                <p className="track-window__detail">
                  Album:
                  <span className="track-window__detail-data">
                    {" "}
                    {trackData.album}
                  </span>
                </p>
              )}

              <div className="track-window__field-track">
                <p className="track-window__detail">Audio:</p>
                <AdminFileInput
                  fileField="audio"
                  accept="audio/*"
                  trackData={trackData}
                  setTrackData={setTrackData}
                  isUploadedFile={isUploadedAudio}
                  setIsUploadedFile={setIsUploadedAudio}
                />
              </div>

              <div className="track-window__field-track">
                <p className="track-window__detail">Release Date:</p>

                <DatePicker
                  selected={trackData.releaseDate}
                  onChange={hangleDateChange}
                  calendarStartDay={1}
                  dateFormat="dd/MM/yyyy"
                  isClearable={true}
                  className="track-window__datepicker-input"
                />
              </div>

              <div className="track-window__field-track">
                <p className="track-window__detail">Label:</p>

                <input
                  className="track-window__input"
                  type="text"
                  name="label"
                  placeholder="Label"
                  value={trackData.label}
                  onChange={handleInput}
                  required={true}
                />
              </div>

              <div className="track-window__field-track">
                <p className="track-window__detail">Duration:</p>

                <input
                  className="track-window__input"
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
        </div>

        <div className="track-window__block-buttons">
          {selectedTrack ? (
            <>
              <button
                className="track-window__button"
                onClick={handleClickUpdate}
              >
                Update Track
              </button>
              <button
                className="track-window__button"
                onClick={handleClickDelete}
              >
                Delete Track
              </button>
            </>
          ) : (
            <button
              className="track-window__button"
              onClick={handleClickCreate}
            >
              Add Track
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTrackWindow;
