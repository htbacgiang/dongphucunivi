import ProductCard from '../../../components/univisport/ProductCard';
import DefaultLayout2 from "../../../components/layout/DefaultLayout2";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import productsData from '../../../components/univisport/data/products';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';
import BannerCarousel from '../../../components/univisport/BannerCarousel';

// Hàm bỏ dấu tiếng Việt để tạo slug không dấu
// Hàm bỏ dấu tiếng Việt và chuẩn hóa slug
const removeDiacritics = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with single hyphen
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

const categories = [
  'Đồng phục Gym', 'Đồng phục Yoga - Pilates', 'Đồng phục Pickleball',
  'Đồng phục Chạy bộ', 'Đồng phục Golf - Tennis', 'Đồng phục MMA',
  'Đồng phục áo Polo', 'Đồng phục áo thun', 'Đồng phục công sở', 'Đồng phục Team building', 'Đồng phục Sự kiện'
];
const DongPhucGym = () => {
  const categorySlug = 'dong-phuc-mma';
  const displayCategory = categories.find(category =>
    removeDiacritics(category).toLowerCase().replace(/\s+/g, '-') === categorySlug
  ) || categorySlug.replace(/-/g, ' ').toUpperCase();

  const initialProducts = productsData.filter(product =>
    product.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  const [products, setProducts] = useState(initialProducts);
  const [layout, setLayout] = useState('grid');
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);

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
    const filteredProducts = initialProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setProducts(filteredProducts);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sortedProducts = [...initialProducts];
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

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Đồng phục Gym - Đồng phục Univi`,
    "description": `Khám phá bộ sưu tập đồng phục gym chất lượng cao từ Đồng phục Univi, thiết kế hiện đại, thoải mái và phù hợp cho mọi hoạt động thể thao.`,
    "url": "https://dongphucunivi.com/san-pham/dong-phuc-mma",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://dongphucunivi.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sản phẩm",
          "item": "https://dongphucunivi.com/san-pham"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Đồng phục Gym",
          "item": "https://dongphucunivi.com/san-pham/dong-phuc-mma"
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "url": `https://dongphucunivi.com/san-pham/${product.slug}`,
        "image": product.image,
        "description": product.description,
        "offers": {
          "@type": "Offer",
          "price": product.discountPrice || product.price,
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock"
        }
      }))
    }
  };

  return (
    <DefaultLayout2>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="relative w-full h-[30vh] md:h-[40vh]">
        <Image
          src="/images/banner-univi.png"
          alt={"Đồng phục Pickleball"}
          fill
          className="brightness-50 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-6 left-0 md:bottom-8 md:left-8 right-0 flex flex-col justify-end items-start text-white px-6 md:px-10 lg:px-16 pb-3">
          <nav aria-label="Breadcrumb">
            <p className="text-sm uppercase text-gray-300 mb-2">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link href="/san-pham" className="hover:underline">Sản phẩm</Link>
              <span className="mx-2">/</span>
              <span aria-current="page">{displayCategory}</span>
            </p>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {displayCategory} - Đồng phục Univi
          </h1>
          <p className="text-sm md:text-lg mt-2 max-w-4xl text-gray-200">
            Khám phá bộ sưu tập {displayCategory.toLowerCase()} mới nhất từ Đồng phục Univi, thiết kế hiện đại và thoải mái.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-1/5 bg-white shadow-md p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4 lg:mb-4">
              <h2
                className="text-lg font-semibold flex items-center justify-between w-full cursor-pointer lg:cursor-default"
                onClick={toggleCategory}
                aria-label="Mở hoặc đóng danh sách danh mục sản phẩm"
              >
                TẤT CẢ DANH MỤC
                <span className="lg:hidden">
                  {isCategoryOpen ? (
                    <IoChevronUp className="w-5 h-5" />
                  ) : (
                    <IoChevronDown className="w-5 h-5" />
                  )}
                </span>
              </h2>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isCategoryOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                } lg:max-h-full lg:opacity-100`}
            >
              <ul className="uppercase cursor-pointer font-semibold">
                {categories.map((category, index) => {
                  const categorySlugFromCategory = removeDiacritics(category)
                    .toLowerCase()
                    .replace(/\s+/g, '-');
                  const isActive = categorySlugFromCategory === categorySlug;
                  const isGymCategory = category === 'Đồng phục Pickleball';

                  return (
                    <li
                      key={index}
                      className={`py-2 cursor-pointer flex justify-between items-center hover:translate-x-2 transition-all duration-300 ${isActive ? 'text-[#105d97] font-bold' : isGymCategory ? 'text-gray-700 hover:text-black' : 'text-gray-700 hover:text-black'
                        }`}
                    >
                      <Link
                        href={`/san-pham/${categorySlugFromCategory}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <BannerCarousel />

          </aside>

          <main className="w-full lg:w-4/5">
            <div className="relative flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-2 z-0">
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={handleSort}
                    className="appearance-none p-2 pl-4 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#105d97] text-gray-700"
                    aria-label="Sắp xếp sản phẩm theo giá hoặc thời gian"
                  >
                    <option value="default">Sắp xếp</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                  <IoChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none" />
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-2 lg:hidden">
                    <button
                      onClick={() => setLayout('grid')}
                      className={`p-2 rounded-lg ${layout === 'grid' ? 'bg-[#105d97] text-white' : 'bg-gray-200 text-gray-700'}`}
                      aria-label="Hiển thị sản phẩm dạng lưới"
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setLayout('list')}
                      className={`p-2 rounded-lg ${layout === 'list' ? 'bg-[#105d97] text-white' : 'bg-gray-200 text-gray-700'}`}
                      aria-label="Hiển thị sản phẩm dạng danh sách"
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="hidden lg:flex gap-2">
                    <button
                      onClick={() => setLayout('grid')}
                      className={`p-2 rounded-lg ${layout === 'grid' ? 'bg-[#105d97] text-white' : 'bg-gray-200 text-gray-700'}`}
                      aria-label="Hiển thị sản phẩm dạng lưới"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h6v6H4V6zm10 0h6v6h-6V6zm-10 10h6v6H4v-6zm10 0h6v6h-6v-6z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setLayout('list')}
                      className={`p-2 rounded-lg ${layout === 'list' ? 'bg-[#105d97] text-white' : 'bg-gray-200 text-gray-700'}`}
                      aria-label="Hiển thị sản phẩm dạng danh sách"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex items-center gap-2 lg:hidden">
                  <button
                    onClick={toggleSearch}
                    className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none z-0"
                    aria-label="Mở thanh tìm kiếm sản phẩm"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                  <div
                    ref={searchRef}
                    className={`absolute right-0 overflow-hidden transition-all duration-300 ease-in-out z-10 will-change-[width,opacity] ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
                      }`}
                    style={{ transitionProperty: 'width, opacity' }}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm kiếm đồng phục gym"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        aria-label="Tìm kiếm sản phẩm đồng phục gym"
                      />
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <input
                    type="text"
                    placeholder="Tìm kiếm đồng phục gym"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#105d97] w-48"
                    aria-label="Tìm kiếm sản phẩm đồng phục gym"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <section className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`} aria-label="Danh sách sản phẩm đồng phục gym">
                {products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      discountPrice={product.discountPrice}
                      discount={product.discount}
                      isNew={product.isNew}
                      colors={product.colors}
                      image={product.image}
                      slug={product.slug}
                      layout={layout}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào trong danh mục {displayCategory}.</p>
            )}
          </main>
        </div>
      </div>
    </DefaultLayout2>
  );
};

export default DongPhucGym;

export async function getServerSideProps() {
  const meta = {
    title: "Đồng phục MMA - Đồng phục Univi",
    description: "Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi! Sản phẩm quần short và áo rashguard MMA của chúng tôi được chế tạo từ vật liệu cao cấp, siêu bền, chống rách và co giãn đa chiều, cho phép bạn thực hiện mọi kỹ thuật grappling và striking một cách tự do.",
    author: "Đồng phục Univi",
    robots: "index, follow",
    canonical: "https://dongphucunivi.com/san-pham/dong-phuc-mma",
    og: {
      title: "Đồng phục MMA - Đồng phục Univi",
    description: "Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi! Sản phẩm quần short và áo rashguard MMA của chúng tôi được chế tạo từ vật liệu cao cấp, siêu bền, chống rách và co giãn đa chiều, cho phép bạn thực hiện mọi kỹ thuật grappling và striking một cách tự do.",
      type: "website",
      image: "https://dongphucunivi.com/images/banner-univi.webp",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://dongphucunivi.com/san-pham/dong-phuc-mma",
      siteName: "Đồng phục Univi",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Đồng phục MMA - Đồng phục Univi",
    description: "Bước vào sàn đấu MMA với sự tự tin tuyệt đối cùng đồng phục chuyên nghiệp từ Đồng Phục Univi! Sản phẩm quần short và áo rashguard MMA của chúng tôi được chế tạo từ vật liệu cao cấp, siêu bền, chống rách và co giãn đa chiều, cho phép bạn thực hiện mọi kỹ thuật grappling và striking một cách tự do.",
      image: "https://dongphucunivi.com/images/banner-univi.webp",
      site: "@UniviSport",
    },
  };

  return {
    props: {
      meta,
    },
  };
}