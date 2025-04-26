import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FeedbackSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample feedback data for Đồng Phục Univi
  const feedbacks = [
    {
      title: "Anh Nguyễn Văn A",
      image: "/images/banner-1.webp",
      link: "/feedback",
    },
    {
      title: "Chị Trần Thị B",
      image: "/images/banner-1.webp",
      link: "/feedback",
    },
    {
      title: "Phòng Gym EcoFit",
      image: "/images/banner-2.webp",
      link: "/feedback",
    },
    {
      title: "Cô Lê Minh C",
      image: "/images/banner-3.webp",
      link: "/feedback",
    },
    {
      title: "Anh Phạm Văn D",
      image: "/images/banner-1.webp",
      link: "/feedback",
    },
    {
      title: "Chị Hoàng Thị E",
      image: "/images/banner-2.webp",
      link: "/feedback",
    },
    {
      title: "Đội Bóng F",
      image: "/images/banner-3.webp",
      link: "/feedback",
    },
  ];

  // Navigation functions
  const nextSlide = () => {
    // Max slide depends on screen size (handled in isNextDisabled)
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Determine number of items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 2 : 5; // md breakpoint in Tailwind
    }
    return 5; // Default for server-side rendering
  };

  // Check if navigation buttons should be disabled
  const itemsPerSlide = getItemsPerSlide();
  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= feedbacks.length - itemsPerSlide;

  // Calculate translateX based on item width (50% for 2 items, 20% for 5 items)
  const itemWidthPercentage = itemsPerSlide === 2 ? 50 : 20;

  return (
    <div className="py-6">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
      <h2 className="text-center text-base sm:text-lg md:text-2xl font-bold text-[#105d97] mb-5 sm:mb-4 md:mb-10">
        FEEDBACK KHÁCH HÀNG UNIVI
      </h2>
        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * itemWidthPercentage}%)` }}
          >
            {feedbacks.map((feedback, index) => (
              <div key={index} className="min-w-[50%] md:min-w-[20%] px-2">
                <Link href={feedback.link}>
                  <div
                    className="flex flex-col cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    role="link"
                    tabIndex={0}
                    aria-label={`Xem feedback từ ${feedback.title}`}
                  >
                    <div className="relative">
                      <Image
                        src={feedback.image}
                        width={400}
                        height={250}
                        alt={feedback.title}
                        layout="responsive"
                        objectFit="cover"
                        loading="lazy"
                        className="w-full rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                      
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300">
                          <span className="px-6 py-2 bg-[#105d97] text-white rounded-full hover:bg-[#105d97] transition-colors">
                            Xem Feedback
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-black text-xl font-bold mt-4 text-center">{feedback.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#105d97] p-0 text-white transition-opacity hover:bg-[#084a7a] focus:outline-none focus:ring-2 ${
              isPrevDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            aria-label="Feedback trước"
            aria-disabled={isPrevDisabled}
            aria-controls="feedback-slider"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className={`absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#105d97] p-0 text-white transition-opacity hover:bg-[#084a7a] focus:outline-none focus:ring-2 ${
              isNextDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            aria-label="Feedback tiếp theo"
            aria-disabled={isNextDisabled}
            aria-controls="feedback-slider"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;