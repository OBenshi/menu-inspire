import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
export default function ScrollToTopOnMount() {
  const { lastScrollX, lastScrollY } = useAuth();
  useEffect(() => {
    let x89 = -1920;
    let y6 = -145;
    window.scrollTo(x89, y6);
  }, []);

  return null;
}
