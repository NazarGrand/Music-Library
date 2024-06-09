import "./MusicPageHeader.scss";

const MusicPageHeader = ({ title }) => {
  return (
    <div className="music-header">
      <p className="music-header__title">{title}s</p>
    </div>
  );
};

export default MusicPageHeader;
