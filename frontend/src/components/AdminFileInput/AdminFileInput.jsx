import "./AdminFileInput.scss";
import { firebase } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import imgCheck from "../../assets/images/Check.svg";

const AdminFileInput = ({
  fileField,
  accept,
  trackData,
  setTrackData,
  isUploadedFile,
  setIsUploadedFile,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (trackData[fileField]) {
      setIsUploadedFile(true);
    } else {
      setIsUploadedFile(false);
    }
  }, [trackData]);

  const handleFileUpload = (e, fieldTrack) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setIsUploading(true);
      setIsUploadedFile(false);
      try {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(selectedFile.name);

        fileRef
          .put(selectedFile)
          .then((snapshot) => {
            snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                setTrackData((prev) => ({
                  ...prev,
                  [fieldTrack]: downloadURL,
                }));
                setIsUploading(false);
                setIsUploadedFile(true);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                setIsUploading(false);
              });
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            setIsUploading(false);
          });
      } catch (e) {
        console.log("Error in try-catch:", e.message);
        setIsUploading(false);
      }
    } else {
      console.log("No file selected!");
      setIsUploading(false);
    }
  };

  return (
    <div className="file">
      {isUploadedFile && <img src={imgCheck} alt="check" />}

      <input
        type="file"
        accept={accept}
        onChange={(e) => handleFileUpload(e, fileField)}
        style={{ display: "none" }}
        id={`upload-${fileField}`}
      />
      <label htmlFor={`upload-${fileField}`} className="file__input">
        {isUploading
          ? "Uploading..."
          : trackData[fileField]
          ? "Change file"
          : "Choose file"}
      </label>
    </div>
  );
};

export default AdminFileInput;
