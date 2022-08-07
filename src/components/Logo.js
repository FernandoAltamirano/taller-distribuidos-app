import { Link } from "react-router-dom";

export const Logo = ({ className, titleHidden = false }) => {
  return (
    <div className='logo-container'>
      <Link to='/'>
        <img src='/logo.png' alt='logo' className={className || ""} />
        {!titleHidden && <h2>Logo</h2>}
      </Link>
    </div>
  );
};
