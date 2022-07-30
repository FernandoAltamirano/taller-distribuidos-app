import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
function ReturnUp() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => setScroll(window.scrollY));
    };
  });
  return (
    <div className={scroll > 0 ? "returnup" : "returnup hidden"}>
      <a href="#header">
        <div>
          <KeyboardArrowUpIcon />
        </div>
      </a>
    </div>
  );
}

export default ReturnUp;
