import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const modalRef = useRef(null);

  const slides = [
    {
      image: "/images/dong-phuc-huan-luyen-vien.webp",
      smallHeading: "ĐỒNG PHỤC HUẤN LUYỆN VIÊN",
      heading: "Chuyên nghiệp & Phong cách",
      description:
        "Không chỉ tối đa hiệu suất tập luyện mà còn là biểu tượng của một hệ thống chuyên nghiệp",
      align: "left",
      animation: "slideFromLeft",
      collectionLink: "/san-pham",
    },
    {
      image: "/images/dong-phuc-the-taho.webp",
      smallHeading: "ĐỒNG PHỤC THỂ THAO",
      heading: "Năng Động & Sáng Tạo",
      description:
      "Bộ sưu tập đồng phục thể thao Univi đa dạng bộ môn, thiết kế theo ý tưởng riêng của các đội nhóm",
      align: "right",
      animation: "slideFromRight",
      collectionLink: "/san-pham",
    },
    {
      image: "/images/giai-phap-2s.webp",
      smallHeading: "GIẢI PHÁP SMART SPORT UNIFORM",
      heading: "Cho Các Phòng Tập",
      description:
      "Được đánh giá cao nhờ tính ứng dụng vượt trội, tối ưu hiệu suất tập luyện. BST 2S Uniform không chỉ tạo sự đồng bộ thương hiệu mà còn mang đến diện mạo trẻ trung, khoắn cho đội ngũ nhân sự.",
      align: "center",
      animation: "slideFromBottom",
      collectionLink: "/san-pham",
    },
  ];

  useEffect(() => {
    if (isPaused || isFormOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, isFormOpen]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFormOpen) return;
      if (e.key === "ArrowLeft") goToPreviousSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide, isFormOpen]);

  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    const modal = modalRef.current;
    const elems = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = elems[0];
    const last = elems[elems.length - 1];

    const trapTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    first?.focus();
    modal.addEventListener("keydown", trapTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", trapTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  return (
    <section
      className="relative h-screen overflow-x-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style jsx>{`
        @keyframes slideFromLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideFromBottom {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes slideFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        .animate-slideFromLeft   { animation: slideFromLeft   0.8s ease-out forwards; }
        .animate-slideFromBottom { animation: slideFromBottom 0.8s ease-out forwards; }
        .animate-slideFromRight  { animation: slideFromRight  0.8s ease-out forwards; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt={`Slide ${currentSlide + 1}: ${slides[currentSlide].smallHeading}`}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-90 transition-opacity duration-1000"
          priority={currentSlide === 0}
          onError={(e) => (e.target.src = "/images/fallback.png")}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div
          className={`
            flex flex-col w-full px-4 md:w-3/4 md:px-0 max-w-4xl box-border
            items-center text-center
            ${slides[currentSlide].align === "left"
              ? "md:items-start md:text-left  md:pl-44"
              : slides[currentSlide].align === "right"
                ? "md:items-end md:text-right md:pr-44 md:ml-auto md:max-w-2xl"
                : "md:mx-auto"
            }
            animate-${slides[currentSlide].animation}
          `}
        >
          <p className="text-blue-300 md:text-3xl text-2xl font-bold uppercase tracking-wider mb-2 small-heading">
            {slides[currentSlide].smallHeading}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {slides[currentSlide].heading}
          </h2>
          <p className="text-gray-200 text-base md:text-lg mb-6">
            {slides[currentSlide].description}
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-[#105d97] text-white px-6 py-3 rounded-md hover:bg-[#173c59] focus:outline-none focus:ring-2 focus:ring-[#105d97]"
              onClick={toggleForm}
              aria-label="Đặt hàng ngay"
            >
              Liên Hệ Ngay
            </button>
            <Link href={slides[currentSlide].collectionLink}
              className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Xem bộ sưu tập"
            >
              Bộ Sưu Tập
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center z-10">
        <button
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="p-2 rounded-full opacity-50 hover:opacity-100 hover:bg-white hover:bg-opacity-20 focus:outline-none transition"
        >
          <FaArrowLeft className="text-white text-2xl" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-10">
        <button
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="p-2 rounded-full opacity-50 hover:opacity-100 hover:bg-white hover:bg-opacity-20 focus:outline-none transition"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${currentSlide === idx ? "bg-[#105d97]" : "bg-gray-400"}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {isFormOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={(e) => e.target === e.currentTarget && toggleForm()}
  >
    <div
      ref={modalRef}
      className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl"
    >
      {/* Header: chỉ chứa nút Close */}
      <div className="bg-white rounded-t-lg px-4 py-3 flex justify-end">
        <button
          onClick={toggleForm}
          aria-label="Close"
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Body: form */}
      <div className="bg-white">
        <ContactForm />
      </div>
    </div>
  </div>
)}

    </section>
  );
}