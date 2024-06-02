import "./HeaderAdminTracks.scss";

const HeaderAdminTracks = ({ openModal }) => {
  const handleClickAdd = () => {
    openModal();
  };

  return (
    <div className="header-tracks">
      <p className="header-tracks__title">Tracks</p>

      <button className="header-tracks__button" onClick={handleClickAdd}>
        Add Track
      </button>
    </div>
  );
};

export default HeaderAdminTracks;
