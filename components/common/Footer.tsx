import Link from "next/link";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
    {/* Cluster 1: Contact Info */}
<div className="flex flex-col md:flex-row justify-center items-start mb-8">
  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 w-full max-w-5xl">
    {/* Contact Info (Vertical on mobile, Horizontal on md+) */}
    <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:gap-4 text-gray-300 w-full">
      <li className="flex items-start">
        <FaPhone className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
        <span>0834.204.999</span>
      </li>
      <li className="flex items-start">
        <FaEnvelope className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
        <span>Yenlb.univi@gmail.com</span>
      </li>
      <li className="flex items-start">
        <FaClock className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
        <div className="flex-col">
          <p>Thời gian mở cửa: 08:00 - 18:00</p>
          <span>(Làm việc cả thứ 7 & CN nghỉ)</span>
        </div>
      </li>
      <li className="flex items-start">
        <FaMapMarkerAlt className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
        <span>Nhà D4, Ng. 180 Đ. Thanh Bình, Hà Đông, Hà Nội</span>
      </li>
    </ul>
  </div>
</div>

        {/* Cluster 2: Footer Columns and Map */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-t border-gray-700 pt-6">
          {/* Column 1: Giới Thiệu */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Giới Thiệu</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/gioi-thieu" className="hover:text-orange-500">
                  Về Đồng phục Univi
                </Link>
              </li>
              <li>
                <Link href="/ho-so-nang-luc" className="hover:text-orange-500">
                 Hồ sơ năng lực
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-orange-500">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Tuyển dụng
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Column 2: Dịch Vụ */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/thiet-ke-noi-that-chung-cu" className="hover:text-orange-500">
                  Đồng phục Gym
                </Link>
              </li>
              <li>
                <Link href="/thiet-ke-noi-that-nha-pho" className="hover:text-orange-500">
                Đồng phục Pickleball
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-noi-that-tron-goi" className="hover:text-orange-500">
                Đồng phục Yoga - Pilates
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-noi-that-tron-goi" className="hover:text-orange-500">
                Đồng phục Chạy bộ
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-noi-that-tron-goi" className="hover:text-orange-500">
                Đồng phục Golf - Tennis
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-noi-that-tron-goi" className="hover:text-orange-500">
                Đồng phục MMA
                </Link>
              </li>
            </ul>
          </div>


          {/* Column 4: Hỗ Trợ Khách Hàng */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Hỗ Trợ Khách Hàng</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Chính sách sử dụng dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Điều khoản sử dụng website
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Chính sách sử dụng Cookie
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Bản Đồ */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Bản Đồ</h3>
            <div className="relative h-40 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2349984942443!2d105.7788898!3d20.9832151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345390f181a5bd%3A0xcdf3833aed740992!2zxJBvzILMgG5nIFBodcyjYyBVbml2aQ!5e0!3m2!1svi!2s!4v1745338067732!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GreenLa Home Location"
              ></iframe>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <a
                  href="https://maps.app.goo.gl/a8jgQbXXUsAyt4jM9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-500"
                >
                  Xem bản đồ lớn hơn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cluster 3: Social Media and Company Name */}
        <div className="border-t border-gray-700 pt-6 flex flex-col justify-center items-center">
          <p className="text-gray-400 text-base mb-2 uppercase">
          Univi Uniform một thương hiệu Thuộc hệ sinh thái Univi Sport
          </p>
        </div>
      </div>
    </footer>
  );
}