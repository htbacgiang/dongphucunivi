import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { projects } from "../../components/tantruonggiang/data/projects";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SEO = ({ project }) => {
  const title = `${project.title} | Phản hồi khách hàng - Đồng phục Univi`;
  const description = `Xem chi tiết dự án ${project.title} cho ${project.customer} – ${project.description}`;
  const image = project.image ?? "/images/dong-phuc-1.jpg";
  const url = `https://dongphucunivi.com/feedback/${project.slug}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`đồng phục, ${project.category.toLowerCase()}, phản hồi khách hàng, Đồng phục Univi, ${project.title}, ${project.customer}`}
      />
      <meta name="author" content="Đồng phục Univi" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Đồng phục Univi" />
      <meta property="og:locale" content="vi_VN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@DongPhucUnivi" />
    </Head>
  );
};

const PropertyDetail = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (!project?.id) {
      setFeaturedProjects([]);
      return;
    }
    const otherProjects = projects.filter((proj) => proj.id !== project.id);
    const randomProjects = getRandomProjects(otherProjects, 3);
    setFeaturedProjects(randomProjects);
  }, [project?.id]);

  if (!project) {
    return <div className="text-center text-white py-10">Dự án không tồn tại</div>;
  }

  const images = project.images?.length > 0 ? project.images : [project.image ?? "/fallback-image.jpg"];
  const swipeThreshold = 50;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > swipeThreshold) {
      handlePrevImage();
    } else if (deltaX < -swipeThreshold) {
      handleNextImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Không thể kết nối với máy chủ");
      }

      setStatus("Gửi thông tin thành công!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Không thể gửi thông tin. Vui lòng thử lại sau."}`);
    }
  };

  const getRandomProjects = (projectsArray, count) => {
    const result = [];
    const available = [...projectsArray];
    for (let i = 0; i < count && available.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      result.push(available.splice(randomIndex, 1)[0]);
    }
    return result;
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <SEO project={project} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative md:h-[40vh] h-[30vh] w-full">
          <Image
            src={project.image ?? "/images/dong-phuc-1.jpg"}
            alt={`Hình ảnh chính của ${project.title}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-70 brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6 md:p-10">
              <p className="text-sm uppercase text-gray-400">
                <Link href="/">
                  <span className="hover:text-blue-400 cursor-pointer">Trang chủ</span>
                </Link>{" "}
                /{" "}
                <Link href="/feedback">
                  <span className="hover:text-blue-400 cursor-pointer">Feedback</span>
                </Link>{" "}
                / {project.title}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{project.title}</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-3/4">
              {/* Image Gallery */}
              <div
                className="relative mt-4"
                style={{ aspectRatio: "3 / 2" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={images[currentImage]}
                  alt={`Hình ảnh ${currentImage + 1} của ${project.title}`}
                  layout="fill"
                  objectFit="contain" // Giữ tỷ lệ gốc, không cắt ảnh
                  objectPosition="center" // Căn giữa ảnh
                  quality={100}
                  fetchPriority="high" // Sửa lỗi chính tả từ fetchpriority
                  className="rounded-lg"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#105d97] text-white p-3 rounded-full hover:bg-blue-400"
                  aria-label="Xem hình ảnh trước"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#105d97] text-white p-3 rounded-full hover:bg-blue-400"
                  aria-label="Xem hình ảnh tiếp theo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${currentImage === index ? "bg-[#105d97]" : "bg-gray-400"}`}
                      onClick={() => setCurrentImage(index)}
                      aria-label={`Xem hình ảnh ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 md:grid-cols-5 md:gap-3 gap-2 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative w-full" style={{ aspectRatio: "3 / 2" }}>
                    <Image
                      src={image}
                      alt={`Hình ảnh phụ ${index + 1} của ${project.title}`}
                      layout="fill"
                      objectFit="cover"
                      quality={75}
                      loading="lazy"
                      className="rounded-lg cursor-pointer"
                      onClick={() => setCurrentImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/4 md:ml-6 mt-6 md:mt-0">
              {/* Featured Projects */}
              <div className="mt-6">
                <h2 className="text-base font-bold text-[#105d97] uppercase">Dự án đồng phục tiêu biểu</h2>
                <div className="mt-4 space-y-4">
                  {featuredProjects.map((featuredProject) => (
                    <Link
                      key={featuredProject.id}
                      href={`/feedback/${featuredProject.slug}`}
                      className="flex flex-col items-center hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        width={300}
                        height={180}
                        className="w-full h-40 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <p className="text-gray-400 text-center mt-2">{featuredProject.title}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800 p-6 mt-4 rounded-lg">
                <h2 className="text-base font-bold text-white mb-2">ĐẶT LỊCH TƯ VẤN</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên *"
                      aria-label="Họ và tên"
                      aria-required="true"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-none"
                        }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại *"
                      aria-label="Số điện thoại"
                      aria-required="true"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-none"
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      aria-label="Email"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-none"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Yêu cầu thiết kế đồng phục của bạn"
                      aria-label="Yêu cầu thiết kế đồng phục"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-none"
                        }`}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "Đang gửi..."}
                    className="w-full bg-[#105d97] text-white p-3 rounded-lg font-bold disabled:opacity-50"
                  >
                    GỬI THÔNG TIN <span>→</span>
                  </button>
                </form>
                {status && (
                  <p
                    className={`mt-2 text-center ${status.includes("thành công") ? "text-green-600" : "text-red-600"}`}
                  >
                    {status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PropertyDetail.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    customer: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default PropertyDetail;

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { props: { project: project || null } };
}