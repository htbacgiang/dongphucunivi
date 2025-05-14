import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const FeedbackSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  const feedbacks = [
    { title: "Chuỗi phòng tập FITCAREE", image: "/khach-hang/fitcare/chuoi-phong-tap-fitcaree.webp", link: "/feedback/chuoi-phong-tap-fitcaree" },
    { title: "Chuỗi phòng tập GOFIT", image: "/khach-hang/gofit/chuoi-phong-tap-gofit.webp", link: "/feedback/chuoi-phong-tap-gofit" },
    { title: "Chuỗi phòng tập THE ONE KickFit", image: "/khach-hang/kickfit/chuoi-phong-tap-the-one-kickfit.webp", link: "/feedback/chuoi-phong-tap-the-one-kickfit" },
    { title: "Chuỗi phòng tập ZENFIT", image: "/khach-hang/zenfit/chuoi-phong-tap-zenfit.webp", link: "/feedback/chuoi-phong-tap-zenfit" },
    { title: "Hệ thống phòng tập INSTRUCTOR JUMPING FITNESS", image: "/khach-hang/jumpfestiva/he-thong-phong-tap-instructor-jumping-fitness.webp", link: "/feedback/he-thong-phong-tap-instructor-jumping-fitness" },
    { title: "LIFE UP ACADEMY", image: "/khach-hang/life-up-academy.webp", link: "/feedback/life-up-academy" },
    { title: "SUNWORD HẠ LONG", image: "/khach-hang/sunword-ha-long.webp", link: "/feedback/sunword-ha-long" },
  ];

  useEffect(() => {
    const updateItemsPerSlide = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 2 : 5);
      setCurrentSlide(0); // Reset slide on resize
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => prev + 1);
  const prevSlide = () => setCurrentSlide((prev) => Math.max(0, prev - 1));

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= feedbacks.length - itemsPerSlide;
  const itemWidthPercentage = itemsPerSlide === 2 ? 50 : 20;

  if (feedbacks.length === 0) {
    return <div className="text-center">No feedback available.</div>;
  }

  return (
    <div className="py-6">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <h2 className="text-center text-base sm:text-lg md:text-2xl font-bold text-[#105d97] mb-5 sm:mb-4 md:mb-10">
          FEEDBACK KHÁCH HÀNG UNIVI
        </h2>
        <div className="relative overflow-hidden">
          <div
            id="feedback-slider"
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
                                        <div className="relative aspect-[3/2] rounded-lg overflow-hidden">

                      <Image
                        src={feedback.image}
                        width={400}
                        height={400} // Đặt height bằng width để đảm bảo tỷ lệ vuông
                        alt={`Feedback from ${feedback.title}`}
                        layout="responsive"
                        objectFit="cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="w-full rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300">
                          <span className="px-6 py-2 bg-[#105d97] text-white rounded-full hover:bg-[#084a7a] transition-colors">
                            Xem Feedback
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-black text-base font-bold mt-4 text-center">{feedback.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute left-0 top-1/3 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#105d97] p-0 text-white transition-opacity hover:bg-[#084a7a] focus:outline-none focus:ring-2 ${
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
            className={`absolute right-0 top-1/3 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#105d97] p-0 text-white transition-opacity hover:bg-[#084a7a] focus:outline-none focus:ring-2 ${
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