import React from "react";
import { Link } from "react-router";

const winners = [
  {
    id: 1,
    name: "Tanvir Alamin",
    game: "PUBG Mobile Tournament",
    prize: "$150",
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
  },
  {
    id: 2,
    name: "Hridoy Gamer",
    game: "Free Fire Championship",
    prize: "$100",
    image: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
  },
  {
    id: 3,
    name: "Shadow Hunter",
    game: "Valorant Pro Cup",
    prize: "$200",
    image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
  },
];

const WinnerSection = () => {
  return (
    <section className="bg-gradient-to-br rounded-3xl max-w-6xl mx-auto from-pink-300 via-gray-900 to-black py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-yellow-400 mb-3">
          🏆 Recent Winners
        </h2>
        <p className="text-gray-400 text-lg">
          Meet our champions and get inspired to become the next winner!
        </p>
      </div>

      {/* Winner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {winners.map((winner) => (
          <div
            key={winner.id}
            className="bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-yellow-500"
          >
            {/* Image */}
            <div className="flex justify-center mt-6">
              <img
                src={winner.image}
                alt={winner.name}
                className="w-24 h-24 rounded-full border-4 border-yellow-400"
              />
            </div>

            {/* Info */}
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-white">
                {winner.name}
              </h3>

              <p className="text-gray-400 mt-1">{winner.game}</p>

              <div className="mt-4 text-yellow-400 font-bold text-2xl">
                {winner.prize}
              </div>

              <p className="text-green-400 mt-2 font-medium">Winner 🎉</p>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation Banner */}
      <div className="text-center mt-12">
        <h3 className="text-2xl text-white font-semibold">
          Think you have what it takes?
        </h3>
        <p className="text-gray-400 mt-2">
          Join contests now and become our next champion!
        </p>
        <Link to={"/all-contests"}>
          <button className="mt-5 hover:scale-105 btn bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition">
            Join Contest
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WinnerSection;
