import React, { useState, useEffect, useRef } from "react";
import logo from "../../public/logo-univi.webp";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ProductDropdown from "../fontend/products/ProductDropdown";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ContactForm from "../header/ContactForm";
import { useSession } from "next-auth/react";
import { setCart } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Replaced isSticky with isScrolled
  const [gioiThieuDropdownOpen, setGioiThieuDropdownOpen] = useState(false);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  useEffect(() => {
    async function syncCart() {
      if (session?.user?.id) {
        try {
          setIsLoading(true);
          const res = await axios.get(`/api/cart?userId=${session.user.id}`);
          dispatch(setCart(res.data));
        } catch (error) {
          console.error("Error syncing cart:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    syncCart();
  }, [session?.user?.id, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGioiThieuDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleContactPopup = () => setContactPopupOpen(!contactPopupOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Updated to setIsScrolled
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <nav
      className={`fixed w-full p-5 md:px-20 h-20 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg bg-white opacity-95" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src={logo}
            alt="Univi Uniforms Logo"
            width={120}
            height={30}
            className={`cursor-pointer w-32 h-auto ${
              isScrolled ? "" : "filter brightness-0 invert"
            }`}
            priority
          />
        </Link>

        <div className="hidden sm:flex">
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Link
                href="/"
                className={`cursor-pointer uppercase ${
                  isScrolled ? "text-[#105d97]" : "text-white"
                } hover:text-blue-300 font-heading font-semibold transition-all duration-500`}
              >
                Trang chủ
              </Link>
            </li>
            <li
              className="relative group"
              ref={dropdownRef}
              onMouseEnter={() => setGioiThieuDropdownOpen(true)}
              onMouseLeave={() => setGioiThieuDropdownOpen(false)}
              onClick={() => setGioiThieuDropdownOpen(!gioiThieuDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setGioiThieuDropdownOpen(!gioiThieuDropdownOpen);
                }
              }}
              role="button"
              aria-haspopup="true"
              aria-expanded={gioiThieuDropdownOpen}
              tabIndex={0}
            >
              <p
                className={`cursor-pointer uppercase ${
                  isScrolled ? "text-[#105d97]" : "text-white"
                } hover:text-blue-300 font-heading font-semibold transition-all duration-500`}
              >
                Về Đồng phục Univi
              </p>
              {gioiThieuDropdownOpen && (
                <ul className="absolute top-6 left-0 bg-white rounded-md shadow-md z-50 w-60 max-w-60 border-t-4 border-[#105d97]">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/gioi-thieu" className="text-black">
                      Về chúng tôi
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/cau-chuyen-thuong-hieu" className="text-black">
                      Câu chuyện thương hiệu
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="/ho-so-nang-luc" className="text-black">
                      Hồ sơ năng lực
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <ProductDropdown />
            </li>
            <li>
              <Link
                href="/bai-viet"
                className={`cursor-pointer uppercase ${
                  isScrolled ? "text-[#105d97]" : "text-white"
                } hover:text-blue-300 font-heading font-semibold transition-all duration-500`}
              >
                Bài viết & Chia sẻ
              </Link>
            </li>
            <li>
              <Link
                href="/lien-he"
                className={`cursor-pointer uppercase ${
                  isScrolled ? "text-[#105d97]" : "text-white"
                } hover:text-blue-300 font-heading font-semibold transition-all duration-500`}
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleContactPopup}
            className="bg-[#105d97] animate-blink py-3 font-heading text-white px-4 rounded font-semibold uppercase"
          >
            Đăng ký tư vấn
          </button>
        </div>

        <div
          className={`md:hidden cursor-pointer pl-24 ${
            isScrolled ? "text-black" : "text-white"
          }`}
          onClick={toggleMenu}
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>

      <ResponsiveNavbar isOpen={menuOpen} toggleMenu={toggleMenu} />
      {contactPopupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={toggleContactPopup}
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-5xl w-full mx-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end items-center p-4 border-b">
              <AiOutlineClose
                className="cursor-pointer"
                size={25}
                onClick={toggleContactPopup}
              />
            </div>
            <ContactForm />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;