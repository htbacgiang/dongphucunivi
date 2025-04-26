import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function VideoHero({ videoSrc = '/video-univi.mp4', fallbackImage = '/fallback-image.jpg' }) {
  const sectionRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = sectionRef.current?.querySelector('video');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoError) {
          video.play().catch(() => setVideoError(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (video) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [videoError]);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-900 text-white py-12 relative"
      aria-labelledby="video-hero-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p lang="vi" className="text-base font-bold uppercase tracking-widest text-blue-300">
              ĐỒNG PHỤC UNIVI SPORT
            </p>
            <h2
              id="video-hero-heading"
              className="text-2xl md:text-3xl font-bold text-white leading-tight"
            >
              Đồng Phục Thể Thao Chuyên Dụng
            </h2>
            <p lang="vi" className="text-gray-300 text-base md:text-lg leading-relaxed">
              Đồng phục UNIVI mang đến đồng phục thể thao chất lượng cao với công nghệ{' '}
              <span className="text-blue-500 font-semibold">UNI DRY</span>, giúp bạn
              luôn khô thoáng và thoải mái trong mọi hoạt động. Chất liệu vải chuyên
              dụng, đường may tinh tế, và giá trị vượt trội cho gym, yoga, chạy bộ và
              hơn thế nữa.
            </p>
            <div className="flex items-center space-x-4">
              <p lang="vi" className="text-base text-gray-400">
                <span className="text-white font-semibold">Đặc điểm:</span>{' '}
                Nhanh khô, Thoáng khí, An toàn
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              {videoError ? (
                <img
                  src={fallbackImage}
                  alt="Fallback image for UNIVI Sport video"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  className="w-full h-full object-cover"
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  tabIndex={0}
                  title="Video giới thiệu đồng phục UNIVI Sport"
                  onError={() => setVideoError(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.target.paused ? e.target.play() : e.target.pause();
                    }
                  }}
                ></video>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

VideoHero.propTypes = {
  videoSrc: PropTypes.string,
  fallbackImage: PropTypes.string,
};