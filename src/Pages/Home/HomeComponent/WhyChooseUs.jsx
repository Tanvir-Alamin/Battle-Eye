import React from "react";
import { ShieldCheck, Zap, Trophy, Users } from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  return (
    <section
      data-aos="zoom-in"
      className=" my-15 rounded-3xl text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-500">
          Why Choose Us
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          We provide a competitive and secure esports environment where players
          can improve skills, compete fairly, and become champions.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
            <ShieldCheck size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fair Play</h3>
            <p className="text-gray-400">
              Strict anti-cheat policies and transparent competition rules.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
            <Zap size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Tournaments</h3>
            <p className="text-gray-400">
              Smooth organization and real-time match updates.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
            <Trophy size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real Rewards</h3>
            <p className="text-gray-400">
              Exciting prizes and recognition for top players.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
            <Users size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Strong Community</h3>
            <p className="text-gray-400">
              A growing network of passionate esports gamers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
