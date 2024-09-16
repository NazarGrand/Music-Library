import "./AdminFileInput.scss";
import { firebase } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import imgCheck from "../../assets/images/Check.svg";
import { t } from "i18next";

const AdminFileInput = ({
  fileField,
  accept,
  trackData,
  setTrackData,
  isUploadedFile,
  setIsUploadedFile,
  setError,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (trackData[fileField]) {
      setIsUploadedFile(true);
    } else {
      setIsUploadedFile(false);
    }
  }, [trackData, fileField, setIsUploadedFile]);

  const isValidFileType = (file) => {
    if (!accept) return true;

    const acceptedTypes = accept.split(",").map((type) => type.trim());

    return acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const baseType = type.split("/")[0];
        return file.type.startsWith(baseType);
      }

      return file.type === type;
    });
  };

  const handleFileUpload = (e, fieldTrack) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (!isValidFileType(selectedFile)) {
        setError("Invalid file type. Please upload a valid file.");
        return;
      }

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
                setError("");

                setIsUploading(false);
                setIsUploadedFile(true);
              })
              .catch((e) => {
                setError(`Error getting download URL: ${e.message}`);
                setIsUploading(false);
              });
          })
          .catch((e) => {
            setError(`Error uploading file: ${e.message}`);
            setIsUploading(false);
          });
      } catch (e) {
        setError(e.message);
        setIsUploading(false);
      }
    } else {
      setError("No file selected!");
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
          ? `${t("uploading")}...`
          : trackData[fileField]
          ? t("changeFile")
          : t("chooseFile")}
      </label>
    </div>
  );
};

export default AdminFileInput;
