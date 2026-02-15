import { TbDeviceGamepad3 } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const CardStyle = (data) => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const contest = data.res;

  return (
    <Link to={`/details/${contest._id}`}>
      <div data-aos="zoom-in" className="hover-3d">
        {/* content */}
        <figure className="max-w-100 rounded-2xl">
          <div className="relative group card w-60 md:w-65 border-2 border-gray-600 md:h-90 rounded-2xl bg-base-100 shadow-lg overflow-hidden">
            {/* IMAGE SECTION */}
            <figure className="aspect-square h-full flex justify-center object-cover items-center overflow-hidden">
              <img
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                src={contest.bannerImage}
                alt=""
              />
            </figure>

            {/* BODY */}
            <div className=" p-3 rounded-b-2xl bg-zinc-900">
              <h2 className="card-title text-lg text-white">
                {contest.contestName}
              </h2>
              <div className="">
                <span className=" text-sm text-white">
                  Entry fee : ${contest.entryFee}
                </span>
                <div>
                  <span className=" text-white text-sm py-1">
                    Prize ${contest.prizeMoney}
                  </span>
                </div>
                <span className=" text-white ">
                  Participants : {contest.participants}
                </span>
              </div>
            </div>

            {/* HOVER JOIN BUTTON OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60">
              <NavLink
                to={`/details/${contest._id}`}
                className="px-4 py-2 text-white border border-white rounded-lg
                         hover:bg-white hover:text-black transition duration-500"
              >
                Join now
              </NavLink>
            </div>
          </div>
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
    </Link>
  );
};

export default CardStyle;
