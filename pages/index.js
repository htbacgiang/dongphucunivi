import Head from "next/head";
import Link from "next/link";
import DefaultLayout2 from "../components/layout/DefaultLayout2";
import BannerTTG from "../components/tantruonggiang/BannerTTG";
import FAQSection from "../components/tantruonggiang/FAQSection";
import BlogHero from "../components/profiles/BlogHero";
import FeedbackSection from "../components/profiles/FeedbackSection";
import PostCard from "../components/common/PostCard";
import { readPostsFromDb, formatPosts } from "../lib/utils";
import ProductCard from "../components/univisport/ProductCard";
import CategoryGrid from "../components/univisport/CategoryGrid";
import StrengthsSection from "../components/tantruonggiang/StrengthsSection";
import VideoHero from "../components/univisport/VideoHero";
import BannerSportswear from "../components/univisport/BannerSportswear";
import BannerPickerball from "../components/univisport/BannerPickerball";
import HeroSection from "../components/univisport/HeroSectionProduct";
import HeroSectionPickleball from "../components/univisport/HeroSectionPickleball";
import HeroSection1 from "../components/univisport/HeroSection1";
import CountdownTimer from "../components/univisport/CountdownTimer";
import PartnersSection from "../components/univisport/PartnersSection";
import CategoryShop from "../components/univisport/CategoryShop";
import FabricCardComponent from "../components/univisport/FabricCardComponent";

// Hàm chuyển đổi đường dẫn tương đối thành URL Cloudinary
const toCloudinaryUrl = (relativePath) => {
  if (!relativePath || typeof relativePath !== 'string') {
    console.warn('Invalid relativePath provided to toCloudinaryUrl:', relativePath);
    return '/images/placeholder.jpg';
  }

  try {
    if (relativePath.includes('/image/upload/')) {
      const parts = relativePath.split('/');
      const versionIndex = parts.findIndex((part) => part.startsWith('v') && !isNaN(part.slice(1)));
      if (versionIndex !== -1) {
        const cleanPath = parts.slice(versionIndex + 1).join('/');
        return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${cleanPath}`;
      }
    }
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${cleanPath}`;
  } catch (error) {
    console.error('Error transforming Cloudinary URL:', error.message, relativePath);
    return '/images/placeholder.jpg';
  }
};

export default function Home({ posts, sportswearProducts, pickleballProducts, meta }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Đồng Phục Univi",
    "url": "https://dongphucunivi.com",
    "logo": "https://dongphucunivi.com/logo-univi.png",
    "sameAs": ["https://www.facebook.com/dongphucunivi"],
    "description":
      "Đồng Phục Univi chuyên may đồng phục thể thao, đồng phục huấn luyện viên cá nhân (PT), đồng phục phòng tập Gym chất lượng cao, thiết kế năng động, tối ưu hiệu suất và thẩm mỹ.",
  };

  return (
    <DefaultLayout2>
      <h1 className="hidden">
        Đồng Phục Univi - May Đồng Phục Thể Thao, Đồng Phục PT, Gym Chuyên Nghiệp
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <BannerTTG />
      <CountdownTimer />
      <CategoryGrid />
      <CategoryShop />
      <HeroSection1 />
      <FabricCardComponent />
      {/* Sportswear Section */}
      <section className="container mx-auto p-3 pb-10" aria-labelledby="sportswear-heading">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 md:block hidden">
            <BannerSportswear />
          </div>
          <div className="lg:col-span-3">
            {sportswearProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sportswearProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      maxPrice={product.maxPrice}
                      discount={product.discount}
                      isNew={product.isNew}
                      colors={product.colors}
                      image={product.image}
                      slug={product.slug}
                      layout="grid"
                    />
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="/san-pham/dong-phuc-gym"
                    className="inline-block px-6 py-2 text-base text-[#105d97] hover:text-[#4db7fdb7]"
                    aria-label="Xem tất cả sản phẩm đồng phục Gym"
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                Không có sản phẩm trong danh mục Đồng Phục Gym.
              </p>
            )}
          </div>
        </div>
      </section>
      {/* Pickleball Section */}
      <section className="container mx-auto p-3 pb-10" aria-labelledby="pickleball-heading">
        <HeroSectionPickleball />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 md:block hidden">
            <BannerPickerball />
          </div>
          <div className="lg:col-span-3">
            {pickleballProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pickleballProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      maxPrice={product.maxPrice}
                      discount={product.discount}
                      isNew={product.isNew}
                      colors={product.colors}
                      image={product.image}
                      slug={product.slug}
                      layout="grid"
                    />
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="/san-pham/dong-phuc-pickleball"
                    className="inline-block px-6 py-2 text-base text-[#105d97] hover:text-[#4db7fdb7]"
                    aria-label="Xem tất cả sản phẩm đồng phục pickleball"
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                Không có sản phẩm trong danh mục Đồng phục Pickleball.
              </p>
            )}
          </div>
        </div>
      </section>
      <VideoHero />
      <StrengthsSection />
      <FeedbackSection />
      <PartnersSection />
      <FAQSection />
      <BlogHero />
      <div className="container mx-auto p-3 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await readPostsFromDb(6, 0);
    const formattedPosts = formatPosts(posts);

    const sportswearResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=dong-phuc-gym`);
    if (!sportswearResponse.ok) {
      throw new Error(`Sportswear API request failed with status ${sportswearResponse.status}`);
    }
    const sportswearData = await sportswearResponse.json();
    if (sportswearData.status !== 'success' || !Array.isArray(sportswearData.products)) {
      throw new Error('Invalid sportswear API response format');
    }

    const sportswearProducts = sportswearData.products.slice(0, 6).map(product => ({
      id: product._id || product.id,
      name: product.name || 'Untitled Product',
      price: product.price || 0,
      maxPrice: product.maxPrice || product.price || 0,
      discount: product.discount || 0,
      isNew: product.isNew || false,
      colors: Array.isArray(product.colors)
        ? product.colors.map(color => ({
            hex: color.hex || '#000000',
            image: toCloudinaryUrl(color.image || product.image),
          }))
        : [],
      image: toCloudinaryUrl(product.image),
      slug: product.slug || '',
    }));

    const pickleballResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=dong-phuc-pickleball`);
    if (!pickleballResponse.ok) {
      throw new Error(`Pickleball API request failed with status ${pickleballResponse.status}`);
    }
    const pickleballData = await pickleballResponse.json();
    if (pickleballData.status !== 'success' || !Array.isArray(pickleballData.products)) {
      throw new Error('Invalid pickleball API response format');
    }

    const pickleballProducts = pickleballData.products.slice(0, 6).map(product => ({
      id: product._id || product.id,
      name: product.name || 'Untitled Product',
      price: product.price || 0,
      maxPrice: product.maxPrice || product.price || 0,
      discount: product.discount || 0,
      isNew: product.isNew || false,
      colors: Array.isArray(product.colors)
        ? product.colors.map(color => ({
            hex: color.hex || '#000000',
            image: toCloudinaryUrl(color.image || product.image),
          }))
        : [],
      image: toCloudinaryUrl(product.image),
      slug: product.slug || '',
    }));

    const meta = {
      title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
      description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
      keywords: "đồng phục thể thao, đồng phục PT, đồng phục Gym, may đồng phục thể thao, đồng phục phòng tập Gym, đồng phục huấn luyện viên cá nhân, Đồng Phục Univi",
      robots: "index, follow",
      author: "Đồng Phục Univi",
      canonical: "https://dongphucunivi.com",
      og: {
        title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
        description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
        type: "website",
        image: "https://dongphucunivi.com/images/banner-univi.webp",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://dongphucunivi.com",
      },
      twitter: {
        card: "summary_large_image",
        title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
        description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
        image: "https://dongphucunivi.com/images/banner-univi.webp",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        sportswearProducts,
        pickleballProducts,
        meta,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message, error.stack);
    return {
      props: {
        posts: [],
        sportswearProducts: [],
        pickleballProducts: [],
        meta: {
          title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
          description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
          keywords: "đồng phục thể thao, đồng phục PT, đồng phục Gym, may đồng phục thể thao, đồng phục phòng tập Gym, đồng phục huấn luyện viên cá nhân, Đồng Phục Univi",
          robots: "index, follow",
          author: "Đồng Phục Univi",
          canonical: "https://dongphucunivi.com",
          og: {
            title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
            description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
            type: "website",
            image: "https://dongphucunivi.com/images/banner-univi.webp",
            imageWidth: "1200",
            imageHeight: "630",
            url: "https://dongphucunivi.com",
          },
          twitter: {
            card: "summary_large_image",
            title: "Đồng Phục Univi: May Đồng Phục Thể Thao, Đồng Phục Doanh Nghiệp",
            description: "Đồng Phục Univi chuyên may đồng phục thể thao & doanh nghiệp với thiết kế đẳng cấp. Chất liệu cao cấp, form chuẩn, tôn vinh thương hiệu. Liên hệ ngay: 083 420 4999.",
            image: "https://dongphucunivi.com/images/banner-univi.webp",
          },
        },
      },
    };
  }
}