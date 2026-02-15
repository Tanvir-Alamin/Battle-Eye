import Aos from "aos";
import { useEffect } from "react";

const AosUse = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return <div></div>;
};
export default AosUse;
