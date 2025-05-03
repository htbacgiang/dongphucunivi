import React, { useState, useEffect, useRef } from "react";
import logo from "../../public/logo-univi.webp";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ProductDropdown2 from "../fontend/products/ProductDropdown2";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ContactForm from "../header/ContactForm";
import { useSession, signIn, signOut } from "next-auth/react";
import { setCart } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [gioiThieuDropdownOpen, setGioiThieuDropdownOpen] = useState(false); // New state for Giới thiệu dropdown
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const { data: session } = useSession();

  const dropdownRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    async function syncCart() {
      if (session?.user?.id) {
        try {
          const res = await axios.get(`/api/cart?userId=${session.user.id}`);
          dispatch(setCart(res.data));
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      }
    }
    syncCart();
  }, [session?.user?.id, dispatch]);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
        setAboutDropdownOpen(false);
        setGioiThieuDropdownOpen(false); // Close Giới thiệu dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleContactPopup = () => {
    setContactPopupOpen(!contactPopupOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full p-5 md:px-20 h-20 z-50 transition-all duration-500 ${isSticky ? "shadow-lg bg-white opacity-95" : "bg-transparent"
        }`}
    >
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={30}
            className={`cursor-pointer w-32 h-auto ${isSticky ? "" : "filter "}`}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Link
                href="/"
                className={`uppercase hover:text-blue-300 font-heading font-semibold ${isSticky ? "text-[#105d97]" : "text-[#105d97]"
                  }`}
              >
                Trang chủ
              </Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setGioiThieuDropdownOpen(true)}
              onMouseLeave={() => setGioiThieuDropdownOpen(false)}
              onClick={() => setGioiThieuDropdownOpen(!gioiThieuDropdownOpen)}
              role="button"
              aria-haspopup="true"
              aria-expanded={gioiThieuDropdownOpen}
            >
              <p
                className={`cursor-pointer uppercase hover:text-blue-300 font-heading font-semibold ${isSticky ? "text-[#105d97]" : "text-[#105d97]"
                  }`}
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
                    <Link href="/ho-so-nang-luc" className="text-black">
                      Hồ sơ năng lực
                    </Link>
                  </li>

                </ul>
              )}
            </li>
            <li>
              <ProductDropdown2 />
            </li>
            <li>
              <Link
                href="/bai-viet"
                className={`uppercase hover:text-blue-300 font-heading font-semibold ${isSticky ? "text-[#105d97]" : "text-[#105d97]"
                  }`}
              >
                Bài viết & Chia sẻ
              </Link>
            </li>
            <li>
              <Link
                href="/lien-he"
                className={`uppercase hover:text-blue-300 font-heading font-semibold ${isSticky ? "text-[#105d97]" : "text-[#105d97]"
                  }`}
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Button Đăng ký tư vấn */}
          <button
            onClick={toggleContactPopup}
            className="bg-[#105d97] animate-blink py-3 font-heading text-white px-4 rounded font-semibold uppercase"
          >
            Đăng ký tư vấn
          </button>
        </div>

        {/* Hamburger Menu */}
        <div
          className="md:hidden text-black cursor-pointer pl-24"
          onClick={toggleMenu}
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>

      {/* Mobile Menu */}
      <ResponsiveNavbar isOpen={menuOpen} toggleMenu={toggleMenu} />
      {/* Contact Popup */}
      {contactPopupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={toggleContactPopup} // Đóng khi click bên ngoài
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