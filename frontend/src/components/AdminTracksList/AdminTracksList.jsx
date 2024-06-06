import AdminTrack from "../AdminTrack/AdminTrack";
import "./AdminTracksList.scss";

const AdminTracksList = ({ trackItems, openModal, setSelectedTrack }) => {
  return (
    <div className="admin-tracks">
      {trackItems.length !== 0 ? (
        <>
          <div className="admin-tracks__headlines">
            <div className="admin-tracks__release-date">
              <span>Release Date</span>
            </div>

            <div className="admin-tracks__labels">
              <span>Label</span>
            </div>

            <div className="admin-tracks__time">
              <span>Time</span>
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
