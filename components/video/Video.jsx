import { useState } from "react";
import { FaPlay,FaYoutube } from "react-icons/fa";

export default function YouTubePlayer({ thumbnailUrl, videoId }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOverlayClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative max-w-screen-xl mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Ảnh nền */}
      <img
        src={thumbnailUrl}
        alt="Video Thumbnail"
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Overlay toàn màn hình */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          {/* Video YouTube */}
          <div
            className="relative w-full max-w-4xl aspect-video p-5"
            onClick={(e) => e.stopPropagation()} // Ngăn overlay bị tắt khi nhấn vào video
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>

            {/* Nút "X" để đóng video */}
            <button
              onClick={handleOverlayClick}
              className="absolute top-2 right-2 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Nút Play */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      w-28 h-20 bg-white rounded-lg opacity-80 flex items-center justify-center
                      shadow-lg cursor-pointer "
        >
          <FaYoutube 
          size={65}
          className="text-red-600 transition-transform duration-300
                      hover:scale-110 animate-pulse" />
        </button>
      )}
    </div>
  );
}
