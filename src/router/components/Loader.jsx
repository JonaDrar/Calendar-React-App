import "../loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <h3
        className="loader-text"
      >
        Cargando... <br />
      </h3>
    </div>
  );
};
