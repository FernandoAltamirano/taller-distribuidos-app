export const Logo = ({ className, titleHidden = false }) => {
  return (
    <div className="logo-container">
      <img src="/logo.png" alt="logo" className={className || ""} />
      {!titleHidden && <h2>Logo</h2>}
    </div>
  );
};
