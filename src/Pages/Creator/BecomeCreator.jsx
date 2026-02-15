import React from "react";
import { useNavigate } from "react-router";
import "aos/dist/aos.css";
import Aos from "aos";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const BecomeCreator = () => {
  Aos.init({
    duration: 900,
    once: true,
  });
  const axiosSecure = useAxiosSecure();
  //   const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleNo = () => {
    navigate("/dashboard");
  };

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-creator");
      toast.success("Request Send, Please wait for admin approval!!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
    navigate("/dashboard");
  };

  return (
    <div className="h-screen bg-transparent flex items-center justify-center">
      <div className="fixed inset-0 flex  items-center justify-center z-50">
        <div
          data-aos="zoom-in"
          className="h-40 p-15 bg-linear-to-b py-40 rounded-4xl from-purple-800 to-white flex flex-col justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4">Become a Creator?</h2>
          <p className="mb-6">
            Do you want to become a creator on our platform?
          </p>

          <div className="flex justify-center gap-3 p-6 border-t">
            <button onClick={() => handleNo()}>
              <div className="hover-3d">
                {/* content */}
                <figure className="max-w-100 rounded-2xl">
                  <span className="btn bg-slate-600 px-5 w-40 text-white btn-outline flex-1 rounded-full">
                    {" "}
                    No
                  </span>
                </figure>
                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>{" "}
            </button>
            <button onClick={() => handleRequest()}>
              <div className="hover-3d">
                {/* content */}
                <figure className="max-w-100 rounded-2xl">
                  <span className="btn w-40 bg-[#7b1fa2]  text-white flex-1 rounded-full">
                    {" "}
                    Yes, Check me
                  </span>
                </figure>
                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreator;
