import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import products from '../../../components/univisport/data/products';
import DefaultLayout from '../../../components/layout/DefaultLayout';
import { FaPencilRuler, FaTshirt, FaIndustry, FaShippingFast } from 'react-icons/fa';


// Breadcrumb Component (unchanged)
function Breadcrumb({ product }) {
  const category = product?.category || 'Đồng phục';
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  const productName = product?.name || 'Sản phẩm';
  const categoryNameVN = product?.categoryNameVN || 'Đồng phục';
  return (
    <nav aria-label="Breadcrumb" className="mb-4 mt-[60px] md:mt-[80px]">
      <ol className="flex flex-wrap items-center space-x-2 text-base text-gray-600">
        <li>
          <Link href="/san-pham" className="hover:text-gray-800" aria-label="Sản phẩm">
            Sản phẩm
          </Link>
        </li>
        <li>
          <span className="">/</span>
        </li>
        <li>
          <Link href={`/san-pham/${categorySlug}`} className="hover:text-gray-800">
            {categoryNameVN}
          </Link>
        </li>
        <li>
          <span className="">/</span>
        </li>
        <li className="text-gray-800" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);

  if (!router.isReady) {
    return <div className="container mx-auto py-8 text-center">Đang tải...</div>;
  }

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="container mx-auto py-8 text-center">Sản phẩm không tồn tại</div>;
  }

  const images = product.colors.length > 0 ? product.colors.map((color) => color.image) : ['/default-image.jpg'];

  // Centralized function to update both Swipers
  const updateSwipers = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideToLoop(index);
    }
    if (thumbsSwiperRef.current) {
      thumbsSwiperRef.current.slideTo(index);
    }
  };

  const handleThumbnailClick = (index) => {
    updateSwipers(index);
  };

  const handleMainSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    updateSwipers(newIndex);
  };

  const handleThumbnailNavigation = (direction) => {
    let newIndex = activeIndex;
    if (direction === 'next') {
      newIndex = (activeIndex + 1) % images.length;
    } else if (direction === 'prev') {
      newIndex = (activeIndex - 1 + images.length) % images.length;
    }
    updateSwipers(newIndex);
  };

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex" aria-label={`Được đánh giá ${rating} trên 5 sao`}>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            key="half"
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="url(#halfStar)"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto py-8 px-4 md:px-0">
        <Breadcrumb product={product} />
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              loop={images.length > 1}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSlideChange={handleMainSlideChange}
              onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
              className="w-full aspect-square"
              role="region"
              aria-label="Product image carousel"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full aspect-square">
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Section */}
            <div className="relative mt-4">
              <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                loop={images.length > 1}
                watchSlidesProgress
                onSwiper={(swiper) => {
                  setThumbsSwiper(swiper);
                  thumbsSwiperRef.current = swiper;
                }}
                className="w-full"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="relative w-full aspect-square cursor-pointer"
                      onClick={() => handleThumbnailClick(index)}
                      role="tab"
                      aria-selected={activeIndex === index}
                      aria-label={`Select image ${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} Thumbnail ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                        className={`rounded-lg border ${activeIndex === index ? 'border-[#105d97] border-2' : 'border-gray-300'
                          }`}
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {images.length > 1 && (
                <>
                  <button
                    className="thumb-swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    onClick={() => handleThumbnailNavigation('prev')}
                    aria-label="Hình ảnh trước"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="thumb-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    onClick={() => handleThumbnailNavigation('next')}
                    aria-label="Hình ảnh tiếp theo"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              {renderStars(product.rating || 0)}
              <span className="text-sm text-gray-500">
                ({product.reviewCount || 0} khách hàng đã đánh giá)
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã sản phẩm</span>
                <span className="font-medium">{product.code || `TCT${product.id}-${product.category.toUpperCase()}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giá sản phẩm</span>
                <a href="#contact" className="text-red-500 font-medium">
                  Liên hệ
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chất liệu</span>
                <span className="font-medium">{product.material || 'Không xác định'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Danh mục</span>
                <span className="font-medium">
                  {product.categoryNameVN}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href="#contact"
                className="flex-1 text-center bg-[#105d97] text-white py-3 rounded-lg hover:bg-[#105d97]"
              >
                Liên hệ nhận báo giá
              </a>
              <a
                href="tel:0925630000"
                className="flex-1 text-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
              >
                Hotline: 0834.204.999
              </a>
            </div>
            {/* 3. Bổ sung icon trước 4 ưu đãi */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <span className="flex-none w-6 h-6 flex items-center justify-center">
                  <FaPencilRuler className="w-full h-full text-[#105d97]" />
                </span>
                <span className="text-base text-gray-600">Miễn phí thiết kế</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-none w-6 h-6 flex items-center justify-center">
                  <FaTshirt className="w-full h-full text-[#105d97]" />
                </span>
                <span className="text-base text-gray-600">Chất vải được lựa chọn khắt khe phù hợp với từng bộ môn thể thao</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-none w-6 h-6 flex items-center justify-center">
                  <FaIndustry className="w-full h-full text-[#105d97]" />
                </span>
                <span className="text-base text-gray-600">Xưởng sản xuất khép kín, không qua trung gian, giá cạnh tranh</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-none w-6 h-6 flex items-center justify-center">
                  <FaShippingFast className="w-full h-full text-[#105d97]" />
                </span>
                <span className="text-base text-gray-600">Sản xuất theo yêu cầu, trả hàng chỉ từ 3 ngày</span>
              </div>
            </div>



          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { notFound: true };

  const defaultImage = '/default-image.jpg';
  const productName = product?.name || 'Đồng phục Univi';
  const productDescription = product?.description ||
    'Khám phá bộ sưu tập đồng phục Univi chất lượng cao, thiết kế hiện đại, phù hợp cho nhiều nhu cầu.';
  const productImage = product?.colors?.[0]?.image || defaultImage;
  const productCategory = product?.category || 'Đồng phục';
  const categorySlug = productCategory.toLowerCase().replace(/\s+/g, '-');

  const meta = {
    title: `${productName} – Đồng phục Univi`,
    description: `${productDescription} Mua sắm tại Univi để nhận được sản phẩm chất lượng với giá tốt nhất.`,
    keywords: `${productName}, đồng phục Univi, ${productCategory}, đồng phục chất lượng, thiết kế đồng phục, Univi, thời trang đồng phục`,
    author: 'Univi',
    robots: 'index, follow',
    canonical: `https://univi.com/product/${params.slug}`,
    og: {
      title: `${productName} – Đồng phục Univi`,
      description: productDescription,
      type: 'product',
      image: productImage,
      imageWidth: '1200',
      imageHeight: '630',
      url: `https://univi.com/product/${params.slug}`,
      siteName: 'Đồng phục Univi',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} – Đồng phục Univi`,
      description: productDescription,
      image: productImage,
      site: '@UniviOfficial',
    },
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://univi.com' },
          { '@type': 'ListItem', position: 2, name: productCategory, item: `https://univi.com/category/${categorySlug}` },
          { '@type': 'ListItem', position: 3, name: productName, item: `https://univi.com/product/${params.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productName,
        image: productImage,
        description: productDescription,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'VND',
          price: product.price || 0,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating || 0,
          reviewCount: product.reviewCount || 0,
        },
      },
    ],
  };

  return { props: { meta } };
}