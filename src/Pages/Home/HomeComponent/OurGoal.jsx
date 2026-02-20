import React from "react";
import { Trophy, Users, Target } from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";

const OurGoal = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });

  return (
    <section data-aos="zoom-in" className=" rounded-3xl my-15">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-500">
          Our Goal
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          Our mission is to build a competitive and inclusive esports community
          where players can grow, compete, and achieve greatness. We believe
          esports is more than gaming — it's passion, teamwork, strategy, and
          dedication.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <Trophy size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl text-white font-semibold mb-2">
              Competitive Excellence
            </h3>
            <p className="text-gray-500">
              Hosting fair and professional tournaments for all skill levels.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <Users size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Strong Community
            </h3>
            <p className="text-gray-400">
              Connecting passionate gamers worldwide in one unified platform.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <Target size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Future Growth
            </h3>
            <p className="text-gray-400">
              Helping players improve skills and reach professional levels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGoal;
