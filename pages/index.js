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
import productsData from "../components/univisport/data/products"; // Import product data
import StrengthsSection from "../components/tantruonggiang/StrengthsSection";
import VideoHero from "../components/univisport/VideoHero";
import BannerSportswear from "../components/univisport/BannerSportswear"
import HeroSection from "../components/univisport/HeroSectionProduct";
import HeroSection1 from "../components/univisport/HeroSection1";
import CountdownTimer from "../components/univisport/CountdownTimer";
import PartnersSection from "../components/univisport/PartnersSection";
export default function Home({ posts, meta }) {
  // JSON-LD Structured Data cho Đồng Phục Univi
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Đồng Phục Univi",
    "url": "https://dongphucunivi.vn",
    "logo": "https://dongphucunivi.vn/logo.png",
    "sameAs": ["https://www.facebook.com/dongphucunivi"],
    "description":
      "Đồng Phục Univi chuyên may đồng phục thể thao, đồng phục huấn luyện viên cá nhân (PT), đồng phục phòng tập Gym chất lượng cao, thiết kế năng động, tối ưu hiệu suất và thẩm mỹ.",
  };

  // Select 8 featured products
  const featuredProducts = productsData
    .filter(product => product.isFeatured)
    .slice(0, 8);
  // Select 6 products for "dong-phuc-the-thao" catalogue
  const sportswearProducts = productsData
    .filter(product => product.category === "dong-phuc-gym")
    .slice(0, 6);
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
      <div className="container mx-auto p-3 pb-10">
        <HeroSection1 />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              discount={product.discount}
              isNew={product.isNew}
              colors={product.colors}
              image={product.image}
              slug={product.slug}
              layout="grid" // Default to grid layout
            />
          ))}
        </div>
      </div>
      {/* Sportswear Section */}
      <section className="container mx-auto p-3 pb-10">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Banner on the left */}
          <div className="lg:col-span-1">
            <BannerSportswear />
          </div>

          {/* Product Grid on the right */}
          <div className="lg:col-span-2">
            {sportswearProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sportswearProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      discountPrice={product.discountPrice}
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
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                Không có sản phẩm trong danh mục Đồng Phục Thể Thao.
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
    const posts = await readPostsFromDb(8, 0);
    const formattedPosts = formatPosts(posts);

    // Meta data tối ưu cho Đồng Phục Univi
    const meta = {
      title:
        "Đồng Phục Univi - May Đồng Phục Thể Thao, Đồng Phục PT, Gym Chuyên Nghiệp",
      description:
        "Đồng Phục Univi – chuyên may đồng phục thể thao, đồng phục huấn luyện viên cá nhân (PT), đồng phục phòng tập Gym. Thiết kế năng động, chất liệu cao cấp, giá hợp lý. Liên hệ ngay: 0962922332.",
      keywords:
        "đồng phục thể thao, đồng phục PT, đồng phục Gym, may đồng phục thể thao, đồng phục phòng tập Gym, đồng phục huấn luyện viên cá nhân, Đồng Phục Univi",
      robots: "index, follow",
      author: "Đồng Phục Univi",
      canonical: "https://dongphucunivi.vn",
      og: {
        title:
          "Đồng Phục Univi - Giải Pháp Đồng Phục Thể Thao, PT & Gym Chuyên Nghiệp",
        description:
          "Đồng Phục Univi – chuyên may đồng phục thể thao, đồng phục PT, đồng phục Gym với thiết kế năng động, chất liệu thoáng mát, giá hợp lý. Liên hệ ngay để sở hữu bộ đồng phục hoàn hảo! Hotline: 0962922332.",
        type: "website",
        image: "https://dongphucunivi.vn/images/dong-phuc-the-thao.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://dongphucunivi.vn",
      },
      twitter: {
        card: "summary_large_image",
        title: "Đồng Phục Univi - Đồng Phục Thể Thao, PT, Gym Chuyên Nghiệp",
        description:
          "Đồng Phục Univi – chuyên may đồng phục thể thao, đồng phục PT, đồng phục Gym với thiết kế năng động, chất liệu cao cấp. Liên hệ ngay: 0962922332.",
        image: "https://dongphucunivi.vn/images/dong-phuc-the-thao.jpg",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [],
        meta: {
          title: "Đồng Phục Univi - Đồng Phục Thể Thao, PT, Gym Chuyên Nghiệp",
          description:
            "Đồng Phục Univi – chuyên may đồng phục thể thao, đồng phục huấn luyện viên cá nhân, đồng phục phòng tập Gym chất lượng cao, giá hợp lý.",
          canonical: "https://dongphucunivi.vn",
        },
      },
    };
  }
}