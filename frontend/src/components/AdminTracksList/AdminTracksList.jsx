import { useTranslation } from "react-i18next";
import AdminTrack from "../AdminTrack/AdminTrack";
import "./AdminTracksList.scss";

const AdminTracksList = ({ trackItems, openModal, setSelectedTrack }) => {
  const { t } = useTranslation();
  return (
    <div className="admin-tracks">
      {trackItems.length !== 0 ? (
        <>
          <div className="admin-tracks__headlines">
            <div className="admin-tracks__release-date">
              <span className="admin-tracks__release-date--title">
                {t("releaseDate")}
              </span>
            </div>

            <div className="admin-tracks__labels">
              <span>{t("label")}</span>
            </div>

            <div className="admin-tracks__time">
              <span>{t("time")}</span>
            </div>
          </div>

          <ul className="admin-tracks__list">
            {trackItems.map((item, index) => (
              <li key={index}>
                <AdminTrack
                  indexTrack={index + 1}
                  track={item}
                  openModal={openModal}
                  setSelectedTrack={setSelectedTrack}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="admin-tracks__subtitle">No tracks</p>
      )}
    </div>
  );
};

export default AdminTracksList;
