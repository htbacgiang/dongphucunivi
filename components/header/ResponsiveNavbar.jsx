import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaRegUser, FaHeart, FaFacebook, FaTwitter, FaLinkedin, FaInstagram,FaChevronUp,FaAngleDown  } from "react-icons/fa";
import logo from "../../public/logo-univi.webp";
import ContactForm from "../profiles/ContactForm"; // Import ContactForm

const ResponsiveMenu = ({ isOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [contactPopupOpen, setContactPopupOpen] = useState(false); // Trạng thái cho popup ContactForm
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const toggleContactPopup = () => {
    setContactPopupOpen(!contactPopupOpen); // Điều khiển popup ContactForm
  };
  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const menuItems = [
    { name: "Trang chủ", link: "/" },
    { name: " Về Đồng phục Univi ",
    dropdown: [
      { name: "Giới thiệu", link: "/gioi-thieu" },
      { name: "Hồ sơ năng lực", link: "/ho-so-nang-luc" },
    ],
  },
  
    {
      name: "Sản phẩm", link: "/san-pham",
      dropdown: [
        { name: "Đồng phục Gym", link: "/san-pham/dong-phuc-gym" },
        { name: "Đồng phục Pickleball", link: "/san-pham/dong-phuc-gym" },
        { name: " Đồng phục Yoga - Pilates", link: "/san-pham/dong-phuc-gym" },
        { name: "Đồng phục Chạy bộ", link: "/san-pham/dong-phuc-gym" },
        { name: " Đồng phục Golf - Tennis", link: "/san-pham/dong-phuc-gym" },
        { name: "Đồng phục MMA", link: "/san-pham/dong-phuc-gym" },



      ],
    },
    { name: "Bài viết", link: "/bai-viet" },
    { name: "Liên hệ", link: "/lien-he" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-[70%] h-full max-h-full overflow-y-auto bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4  ">
          <Image src={logo} alt="Logo" width={150} height={70} />
          <AiOutlineClose
            size={25}
            className="cursor-pointer text-gray-700 "
            onClick={toggleMenu}
          />
        </div>



        {/* Menu Items */}
        <ul className="space-y-4 px-4 border-b border-gray-300 pb-4 uppercase">
          {menuItems.map((item, index) => (
            <li key={index}>
              {!item.dropdown ? (
                <Link href={item.link} className="text-lg font-medium hover:text-green-600">
                  {item.name}
                </Link>
              ) : (
                <>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleDropdown(index)}
                    role="button"
                    aria-expanded={activeDropdown === index}
                  >
                    <span className="text-lg font-medium hover:text-green-600">
                      {item.name}
                    </span>
                    <span className="text-lg">
                      {activeDropdown === index ? (
                        <FaChevronUp size={20} />
                      ) : (
                        <FaAngleDown  size={20} />
                      )}
                    </span>
                  </div>
                  <ul
                    className={`pl-4 mt-2 ${
                      activeDropdown === index ? "max-h-96" : "max-h-0"
                    } overflow-hidden transition-all duration-300`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.link}
                          className="block py-1 text-gray-700 hover:text-green-600"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Social Media Links */}
        <div className="flex space-x-4 justify-center mt-6">
          <Link href="https://facebook.com/www.truongnq.vn" className="text-xl text-gray-600 hover:text-blue-600">
            <FaFacebook />
          </Link>
          <Link href="https://twitter.com" className="text-xl text-gray-600 hover:text-blue-400">
            <FaTwitter />
          </Link>
          <Link href="https://www.linkedin.com/in/truongnq-vn" className="text-xl text-gray-600 hover:text-blue-700">
            <FaLinkedin />
          </Link>
          <Link href="https://instagram.com/truongtl27.ht" className="text-xl text-gray-600 hover:text-pink-600">
            <FaInstagram />
          </Link>
        </div>
      </div>
            {/* Contact Popup */}
            {contactPopupOpen && (
        <div
  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
  onClick={toggleContactPopup} // Đóng khi click bên ngoài
>
  <div
    className="bg-white rounded-2xl shadow-lg max-w-5xl w-full mx-4 animate-slide-up"
    onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click bên trong
  >
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-xl font-semibold text-pink-500 uppercase text-center w-full">Đăng ký nhận tư vấn website miễn phí</h2>
      <AiOutlineClose
        className="cursor-pointer"
        size={25}
        onClick={toggleContactPopup}
      />
    </div>
    <div className="p-8">
      <ContactForm /> {/* Gọi ContactForm */}
    </div>
  </div>
</div>

      )}
    </>
  );
};

export default ResponsiveMenu;
