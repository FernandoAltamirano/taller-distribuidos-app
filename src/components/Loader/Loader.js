import "./loader.css";
export const Loader = ({ message }) => {
  return (
    <div className="metronome-container">
      <div className="metronome">
        <div className="metronome__dot"></div>
        <div className="metronome__dot"></div>
        <div className="metronome__dot"></div>
        <div className="metronome__dot"></div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
