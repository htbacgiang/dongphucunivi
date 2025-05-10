import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import logo from "../../public/logo-univi.webp";
import ContactForm from "../profiles/ContactForm";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
// Icon container with fixed size to unify icon appearance
const IconWrapper = ({ children }) => (
  <span className="w-5 h-5 flex items-center justify-center text-lg">
    {children}
  </span>
);

const menuItems = [
  { name: "Trang chủ", link: "/" },
  {
    name: "Về Đồng phục Univi",
    dropdown: [
      { name: "Giới thiệu", link: "/gioi-thieu" },
      { name: "Câu chuyện thương hiệu", link: "/cau-chuyen-thuong-hieu" },
      { name: "Hồ sơ năng lực", link: "/ho-so-nang-luc" },
    ],
  },
  {
    name: "Sản phẩm",
    link: "/san-pham",
    dropdown: [
      {
        name: "Đồng phục thể thao",
        subDropdown: [
          { name: " GYM", link: "/san-pham/dong-phuc-gym" },
          { name: "MMA", link: "/san-pham/dong-phuc-mma" },
          { name: "Lễ tân", link: "/san-pham/dong-phuc-le-tan" },
          { name: "Chạy bộ", link: "/san-pham/dong-phuc-chay-bo" },
          { name: "Pickleball", link: "/san-pham/dong-phuc-pickleball" },
          { name: "YOGA - Pilates", link: "/san-pham/dong-phuc-yoga-pilates" },

        ],
      },
      {
        name: "Đồng phục doanh nghiệp",
        subDropdown: [
          { name: "Áo Polo", link: "/san-pham/dong-phuc-ao-polo" },
          { name: "Áo thun", link: "/san-pham/dong-phuc-ao-thun" },
          { name: "Công sở", link: "/san-pham/dong-phuc-cong-so" },
          { name: "Sự kiện", link: "/san-pham/dong-phuc-su-kien" },
          { name: "Team building", link: "/san-pham/dong-phuc-team-building" },

        ],
      },
    ],
  },
  { name: "Bài viết", link: "/bai-viet" },
  { name: "Liên hệ", link: "/lien-he" },
];

const ResponsiveMenu = ({ isOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = (idx) => {
    setActiveDropdown(activeDropdown === idx ? null : idx);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (subIdx) => {
    setActiveSubDropdown(activeSubDropdown === subIdx ? null : subIdx);
  };

  const toggleContactPopup = () => setContactPopupOpen(!contactPopupOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        if (contactPopupOpen) setContactPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contactPopupOpen]);

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      {/* sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-2/3 h-full bg-white transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* header */}
        <div className="relative p-4">
          <X
            size={24}
            onClick={toggleMenu}
            className="absolute right-4 top-4 text-gray-700 cursor-pointer"
          />
          <div className="flex justify-center">
            <Image src={logo} alt="Logo Univi" width={80} height={40} />
          </div>
        </div>

        {/* menu list */}
        <ul className="px-4 space-y-4 uppercase text-base mt-3">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.dropdown ? (
                <div
                  onClick={() => toggleDropdown(idx)}
                  className="flex justify-between items-center cursor-pointer font-semibold text-[#105d97] hover:text-[#4496d4]"
                >
                  <span>{item.name}</span>
                  <IconWrapper>
                    {activeDropdown === idx ? (
                      <ChevronUp  />
                    ) : item.name === "Về Đồng phục Univi" ? (
                      <ChevronDown />
                    ) : (
                      <ChevronDown/>
                    )}
                  </IconWrapper>
                </div>
              ) : (
                <Link href={item.link} onClick={toggleMenu} className="block font-semibold  text-[#105d97] hover:text-[#4496d4]">
                  {item.name}
                </Link>
              )}

              {/* dropdown content */}
              {activeDropdown === idx && (
                <ul className="pl-4 mt-2 space-y-2">
                  {item.name === "Về Đồng phục Univi"
                    ? item.dropdown.map((sub, i) => (
                        <li key={i}>
                          <Link
                            href={sub.link}
                            onClick={toggleMenu}
                            className="flex justify-between items-center text-sm font-semibold text-[#105d97] hover:text-[#4496d4]"
                          >
                            <span>{sub.name}</span>
                            <IconWrapper><ChevronRight  /></IconWrapper>
                          </Link>
                        </li>
                      ))
                    : item.dropdown.map((grp, gIdx) => (
                        <li key={gIdx}>
                          <div
                            onClick={() => toggleSubDropdown(gIdx)}
                            className="flex justify-between items-center  text-sm  cursor-pointer font-semibold text-[#105d97] hover:text-[#4496d4]"
                          >
                            <span>{grp.name}</span>
                            <IconWrapper>
                              {activeSubDropdown === gIdx ? <ChevronUp /> : <ChevronDown  />}
                            </IconWrapper>
                          </div>
                          {activeSubDropdown === gIdx && grp.subDropdown && (
                            <ul className="pl-4 mt-1 space-y-1">
                              {grp.subDropdown.map((n, nIdx) => (
                                <li key={nIdx}>
                                  <Link href={n.link} onClick={toggleMenu} className="block text-[#105d97] hover:text-[#4496d4]">
                                    {n.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* contact button */}
        <div className="px-4 mt-6">
          <button
            onClick={toggleContactPopup}
            className="w-full bg-[#105d97] text-white py-2 rounded-md hover:bg-[#2a6a9b]"
          >
            Liên hệ tư vấn
          </button>
        </div>
      </div>

      {/* contact popup */}
      {contactPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={toggleContactPopup}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-11/12 max-w-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <X size={20} className="cursor-pointer text-gray-700" onClick={toggleContactPopup} />
            </div>
            <ContactForm onSubmit={toggleContactPopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveMenu;
