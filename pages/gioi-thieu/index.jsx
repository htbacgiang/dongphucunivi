import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import AboutNavigation from "../../components/univisport/AboutNavigation";
import AboutUniviPage from "../../components/univisport/AboutUniviPage";
import styles from "../../styles/AboutUnivi.module.css";

export default function AboutUs({ meta }) {
  return (
    <DefaultLayout2>
      {/* Hero Section */}
      <div className="relative w-full h-[30vh] md:h-[40vh]">
        <Image
          src="/images/banner-univi.png"
          alt={`Đồng phục Gym Đồng phục Univi - Bộ sưu tập thể thao chất lượng cao`}
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
              <Link href="/gioi-thieu" className="hover:underline">Giới thiệu</Link>
            </p>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Giới thiệu về Đồng phục Univi
          </h1>

        </div>
      </div>

      {/* Main Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-black text-sm md:text-lg mb-3">
                Đồng Phục Univi là đơn vị xưởng may chuyên cung cấp đồng phục thể thao, đồng phục công ty, đồng phục công sở, áo polo, áo sơ mi văn phòng cao cấp,… Univi tự hào với hơn 8 năm kinh nghiệm trong lĩnh vực thiết kế đồng phục, trở thành một cái tên quen thuộc trong ngành thời trang đồng phục, trở thành đối tác của các hàng trăm doanh nghiệp, tập đoàn và đội nhóm như: Sun Group, Premier Village, Sun World, Thanh Cong Group, Tập đoàn than khoáng sản Việt Nam, KickFit Sport, Fitcare, Yoko Onsen Quang Hanh,…
              </p>
              <figure className="max-w-5xl mx-auto flex justify-center">
                <Image
                  src="/images/gioi-thieu/gioi-thieu-univi.jpg"
                  alt="Phân xưởng sản xuất của Đồng Phục Univi"
                  width={800}
                  height={400}
                  layout="responsive"
                  className="rounded"
                  loading="lazy"
                />
              </figure>
              <figcaption className="text-center text-gray-600 text-lg mt-2">
                Hình ảnh tại phân xưởng sản xuất số 03 tại Hải Dương
              </figcaption>
            </div>
          </div>

          <div className={`prose max-w-none mt-5 ${styles.customProse}`}>
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">I. Lịch sử hình thành và phát triển</h2>
          </div>

          <figure className={`max-w-5xl mx-auto flex justify-center items-center my-4 ${styles.centeredFigure}`}>
            <Image
              src="/images/gioi-thieu/ve-univi.jpg"
              alt="Hành trình phát triển của Đồng Phục Univi"
              width={800}
              height={400}
              layout="responsive"
              className={`rounded ${styles.centeredImage}`}
              loading="lazy"
            />
          </figure>
          <figcaption className="text-center text-gray-600 text-lg mt-1">
            Hình ảnh tại phân xưởng sản xuất chính của Univi
          </figcaption>
          <AboutNavigation />

          <p className="font-semibold">
            Ngay từ những bước đầu, các dòng sản phẩm của Univi ở các bộ môn như:  Gym, Fitness, Pickleball, Yoga, Running, Pilates, MMA... đã được đón nhận vượt kỳ vọng từ khách hàng trên toàn quốc.
          </p>
        </div>
      </section>

      <section>
        <AboutUniviPage />
      </section>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Giới Thiệu Đồng Phục Univi - Chuyên May Đồng Phục Cao Cấp",
    description: "Đồng Phục Univi – Chuyên cung cấp đồng phục thể thao, công ty, công sở, áo polo, áo sơ mi cao cấp với hơn 8 năm kinh nghiệm.",
    keywords:
      "đồng phục, đồng phục thể thao, đồng phục công ty, áo polo, Đồng phục Univi",
    robots: "index, follow",
    author: "Đồng Phục Univi",
    canonical: "https://dongphucunivi.com/gioi-thieu",
    og: {
    title: "Giới Thiệu Đồng Phục Univi - Chuyên May Đồng Phục Cao Cấp",
    description: "Đồng Phục Univi – Chuyên cung cấp đồng phục thể thao, công ty, công sở, áo polo, áo sơ mi cao cấp với hơn 8 năm kinh nghiệm.",

      type: "website",
      image: "https://dongphucunivi.com/images/banner-univi.webp",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://dongphucunivi.com/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới Thiệu Đồng Phục Univi",
    description: "Đồng Phục Univi – Chuyên cung cấp đồng phục thể thao, công ty, công sở, áo polo, áo sơ mi cao cấp với hơn 8 năm kinh nghiệm.",

      image: "https://dongphucunivi.com/images/banner-univi.webp",
    },
  };

  return {
    props: {
      meta,
    },
  };
}