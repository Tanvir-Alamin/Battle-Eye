import { TbDeviceGamepad3 } from "react-icons/tb";
import { NavLink } from "react-router";

const CardStyle = (data) => {
  const contest = data.res;
  console.log(data);

  return (
    <div className="card w-75 md:w-90 border-2 border-gray-600 md:h-full  hover:scale-102 transform transition-all duration-300 ease-in-out bg-base-100 shadow-lg">
      <figure className="w-full h-full flex justify-center items-center overflow-hidden">
        <img
          className="h-80 w-full object-cover"
          src={contest.bannerImage}
          alt=""
        />
      </figure>
      <div className="card-body rounded-b-2xl bg-gray-900">
        <div className="flex justify-between">
          <span className="font-semibold bg-[#000000] rounded-lg  text-sm py-1 px-2">
            Entry fee {contest.entryFee}$
          </span>
          <span className="flex text-white gap-1 items-center">
            Participants : {contest.participants}
          </span>
        </div>
        <h2 className="card-title text-lg text-white font-bold">
          {contest.contestName}
        </h2>

        <div className="">
          <span className="font-semibold text-white text-md rounded-lg py-1 ">
            Prize ${contest.prizeMoney}
          </span>
        </div>
        <NavLink
          to={`/details/${"yyy"}`}
          className="bg-fuchsia-500 flex items-center hover:scale-107 transform transition-all duration-300 ease-in-out hover:skeleton gap-1 text-white btn py-2 font-semibold px-5 rounded-3xl"
        >
          Join now{" "}
          <TbDeviceGamepad3 size={16} strokeWidth={3} absoluteStrokeWidth />
        </NavLink>
      </div>
    </div>
  );
};

export default CardStyle;
