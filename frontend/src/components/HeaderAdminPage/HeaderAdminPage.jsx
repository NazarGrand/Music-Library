import "./HeaderAdminPage.scss";

const HeaderAdminPage = ({ openModal, title }) => {
  const handleClickAdd = () => {
    openModal();
  };

  return (
    <div className="header-page">
      <p className="header-page__title">{title}s</p>

      <button className="header-page__button" onClick={handleClickAdd}>
        Add {title}
      </button>
    </div>
  );
};

export default HeaderAdminPage;
