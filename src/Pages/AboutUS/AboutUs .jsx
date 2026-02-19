import React from "react";
import { Trophy, Target, Users, Rocket } from "lucide-react";
import { Link } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  return (
    <div className=" text-white">
      {/* Hero Section */}
      <section
        data-aos="zoom-in"
        className="py-24 rounded-4xl px-6 text-center bg-gradient-to-r from-black via-gray-900 to-black"
      >
        <h1 className="text-5xl  md:text-6xl font-bold text-purple-500 mb-6">
          About Us
        </h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          We are a competitive esports platform built for passionate gamers. Our
          mission is to create opportunities, build champions, and shape the
          future of competitive gaming.
        </p>
      </section>

      {/* Mission & Vision */}
      <section
        data-aos="zoom-in"
        className="py-20 rounded-4xl px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
      >
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <Target size={40} className="text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-400">
            To empower gamers by providing fair tournaments, professional
            competition environments, and opportunities to grow into elite
            esports players.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
          <Rocket size={40} className="text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-400">
            To become a leading esports community where talent meets opportunity
            and champions are created through passion, dedication, and teamwork.
          </p>
        </div>
      </section>

      {/* Why We Started */}
      <section
        data-aos="zoom-in"
        className="py-20 rounded-4xl px-6 bg-gray-950 text-center"
      >
        <h2 className="text-4xl font-bold text-purple-500 mb-6">
          Why We Started
        </h2>
        <p className="max-w-4xl mx-auto text-gray-400 text-lg">
          We saw talented gamers struggling to find real competitive platforms.
          We started this journey to give players a space where skill matters,
          fair play is guaranteed, and hard work is rewarded.
        </p>
      </section>

      {/* Stats Section */}
      <section
        data-aos="zoom-in"
        className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        <div>
          <Users size={35} className="mx-auto text-purple-500 mb-3" />
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-gray-400">Active Players</p>
        </div>

        <div>
          <Trophy size={35} className="mx-auto text-purple-500 mb-3" />
          <h3 className="text-3xl font-bold">500+</h3>
          <p className="text-gray-400">Tournaments Hosted</p>
        </div>

        <div>
          <Target size={35} className="mx-auto text-purple-500 mb-3" />
          <h3 className="text-3xl font-bold">95%</h3>
          <p className="text-gray-400">Fair Play Rating</p>
        </div>

        <div>
          <Rocket size={35} className="mx-auto text-purple-500 mb-3" />
          <h3 className="text-3xl font-bold">50+</h3>
          <p className="text-gray-400">Professional Partners</p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-aos="zoom-in"
        className="py-20 px-6 text-center rounded-4xl mb-25 bg-gradient-to-r from-purple-900 to-black"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Compete?</h2>
        <p className="text-gray-300 mb-8">
          Join our community and take your esports journey to the next level.
        </p>
        <a href="/all-contests" className="hover-3d my-12 mx-2 cursor-pointer">
          {/* content */}
          <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
            <Link
              to={"/all-contests"}
              className="bg-purple-600 hover:skeleton hover-3d  px-8 py-3 rounded-xl font-bold transition"
            >
              Join Now
            </Link>
          </div>

          {/* 8 empty divs needed for the 3D effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
