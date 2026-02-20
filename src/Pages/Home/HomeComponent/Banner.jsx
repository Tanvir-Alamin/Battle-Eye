import React, { useRef, useState } from "react";
import {
  FaSearch,
  FaVolumeMute,
  FaVolumeUp,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { useNavigate } from "react-router"; // <-- import navigation

const Banner = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [searchTerm, setSearchTerm] = useState(""); // <-- search state

  const navigate = useNavigate(); // <-- for navigation

  // PLAY / PAUSE
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // MUTE
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // VOLUME
  const handleVolume = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = Number(e.target.value);
    video.volume = vol;
    video.muted = vol === 0;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  // SEARCH
  const handleSearch = () => {
    if (!searchTerm.trim()) return; // don't search empty
    // Navigate to all-contests page with query param
    navigate(`/all-contests?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-20">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/assassin's creed.mp4"
        className="w-full h-[500px] object-cover rounded-2xl"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

      {/* SEARCH AREA CENTER */}
      <div className="absolute inset-0 flex justify-center items-center gap-3">
        <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 px-4 py-3 rounded-xl shadow-xl">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm} // bind value
            onChange={(e) => setSearchTerm(e.target.value)} // update state
            className="bg-transparent outline-none text-white placeholder-white w-64"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // enter to search
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          Search
        </button>
      </div>

      {/* VIDEO CONTROLS BOTTOM LEFT */}
      <div className="absolute bottom-5 left-5 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
        {/* Play Pause */}
        <button onClick={togglePlay} className="text-white text-xl">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        {/* Mute */}
        <button onClick={toggleMute} className="text-white text-xl">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Banner;
