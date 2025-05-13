import Head from 'next/head';

export default function BlogHero() {
  return (
    <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl md:text-3xl mt-4 font-semibold text-[#105d97] uppercase tracking-wide"
            id="hero-heading"
          >
            UNIVI Sport
          </h2>
          <h3 className="text-xl md:text-2xl mt-2 font-bold text-gray-900">
            Trang Phục Thể Thao Chuyên Dụng Cho Mọi Phong Cách Sống
          </h3>
        </div>
    </>
  );
}