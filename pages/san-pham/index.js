import ProductCard from '../../components/univisport/ProductCard';
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { formatPosts, readPostsFromDb } from '../../lib/utils';
import productsData from '../../components/univisport/data/products';
import HeroSection1 from "../../components/univisport/HeroSection1";
import CategoryGrid from '../../components/univisport/CategoryGrid';
import CountdownTimer from '../../components/univisport/CountdownTimer';
import ContactForm from '../../components/header/ContactForm';
import ProductPage from '../../components/univisport/ProductPage';
import HeroSectionBlog from '../../components/univisport/HeroSectionBlog';
import FabricCardComponent from '../../components/univisport/FabricCardComponent';
import CategoryShop from '../../components/univisport/CategoryShop';

const ProductsPage = ({ relatedPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);
  // Trạng thái để điều khiển hiển thị popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Hàm xử lý mở/đóng popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) setSearchQuery('');
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = productsData.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setProducts(filteredProducts);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sortedProducts = [...productsData];
    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (option === 'newest') {
      sortedProducts.sort((a, b) => b.isNew - a.isNew);
    }
    const filteredProducts = sortedProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);
  // Select a few featured products (e.g., first 3 products)
  const featuredProducts = productsData.slice(0, 8);
  // State và logic cho form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập yêu cầu của bạn";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Gửi thông tin thành công!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi form"}`);
    }
  };
  return (
    <DefaultLayout2>
      <div className="relative w-full h-[30vh] md:h-[40vh]">
        <Image
          src="/images/banner-univi.png"
          alt="Univi Sport - Đồ Phục Thể Thao"
          fill
          className="brightness-50 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-6 left-0 md:bottom-8 md:left-8 right-0 flex flex-col justify-end items-start text-white px-6 md:px-10 lg:px-16 pb-3">
          <nav aria-label="Breadcrumb">
            <p className="text-sm uppercase text-gray-300 mb-2">
              <Link href="/" className="hover:underline">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <span aria-current="page">Sản phẩm</span>
            </p>
          </nav>
          <p className="text-2xl md:text-4xl font-bold text-white">
            Đồng phục Univi
          </p>
          <p className="text-sm md:text-lg mt-2 max-w-2xl text-gray-200">
            Khám phá bộ sưu tập đồ phục thể thao mới nhất từ Univi Sport
          </p>
        </div>
      </div>
      <CountdownTimer />
      <CategoryGrid />
      <CategoryShop />
      <HeroSection1 />
      <FabricCardComponent />
    </DefaultLayout2>
  );
};


export const getServerSideProps = async () => {
  try {
    const posts = await readPostsFromDb(3, 0);
    const formattedPosts = formatPosts(posts);
    const meta = {
      title: "Thiết Kế Nội Thất Chung Cư Từ A-Z | Phong Cách, Diện Tích, Phong Thủy",
      description: "Khám phá hướng dẫn chi tiết thiết kế nội thất chung cư từ A-Z, cập nhật xu hướng 2025! Tìm hiểu cách tối ưu không gian sống cho căn hộ từ 30-120m² với các phong cách hiện đại, tối giản, Scandinavian, Japandi, Indochine. Nhận gợi ý bố trí phòng khách, bếp, ngủ, ban công, kết hợp phong thủy hợp mệnh gia chủ để thu hút tài lộc, sức khỏe.",
      content: "Khám phá hướng dẫn chi tiết thiết kế nội thất chung cư từ A-Z, cập nhật xu hướng 2025! Tìm hiểu cách tối ưu không gian sống cho căn hộ từ 30-120m² với các phong cách hiện đại, tối giản, Scandinavian, Japandi, Indochine. Nhận gợi ý bố trí phòng khách, bếp, ngủ, ban công, kết hợp phong thủy hợp mệnh gia chủ để thu hút tài lộc, sức khỏe.",
      keywords:
        "thi công nội thất trọn gói, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, GreenLa Home, thiết kế nội thất",
      robots: "index, follow",
      author: "GreenLa Home",
      canonical: "https://greenlahome.vn/thiet-ke-noi-that-chung-cu",
      og: {
        title: "GreenLa Home – Thi Công Nội Thất Trọn Gói Chuyên Nghiệp",
        description:
          "Khám phá dịch vụ thi công nội thất trọn gói từ GreenLa Home: chung cư, nhà phố, gỗ công nghiệp chất lượng cao, tối ưu chi phí.",
        type: "website",
        image: "https://greenlahome.vn/images/thiet-ke-noi-that-chung-cu.png",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn/thiet-ke-noi-that-chung-cu",
      },
      twitter: {
        card: "summary_large_image",
        title: "Thiết Kế Nội Thất Chung Cư Từ A-Z | Phong Cách, Diện Tích, Phong Thủy",
        description: "Khám phá hướng dẫn chi tiết thiết kế nội thất chung cư từ A-Z, cập nhật xu hướng 2025! Tìm hiểu cách tối ưu không gian sống cho căn hộ từ 30-120m² với các phong cách hiện đại, tối giản, Scandinavian, Japandi, Indochine. Nhận gợi ý bố trí phòng khách, bếp, ngủ, ban công, kết hợp phong thủy hợp mệnh gia chủ để thu hút tài lộc, sức khỏe.",
        image: "https://greenlahome.vn/images/thiet-ke-noi-that-chung-cu.png",
      },
    };

    return {
      props: {
        relatedPosts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return {
      props: {
        relatedPosts: [],
        meta: {
          title: "Thiết Kế Nội Thất Chung Cư Từ A-Z | Phong Cách, Diện Tích, Phong Thủy",
          description: "Khám phá hướng dẫn chi tiết thiết kế nội thất chung cư từ A-Z, cập nhật xu hướng 2025! Tìm hiểu cách tối ưu không gian sống cho căn hộ từ 30-120m² với các phong cách hiện đại, tối giản, Scandinavian, Japandi, Indochine. Nhận gợi ý bố trí phòng khách, bếp, ngủ, ban công, kết hợp phong thủy hợp mệnh gia chủ để thu hút tài lộc, sức khỏe.",
          canonical: "https://greenlahome.vn/thiet-ke-noi-that-chung-cu",
        },
      },
    };
  }
};
export default ProductsPage;