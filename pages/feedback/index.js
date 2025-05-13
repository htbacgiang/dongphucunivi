import ProjectCard from "../../components/tantruonggiang/ProjectCard";
import { projects } from "../../components/tantruonggiang/data/projects";
import Link from "next/link";
import { useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";

export default function DuAn({ meta = {} }) {
  const [filter, setFilter] = useState("all");

  const FILTERS = [
    { id: "all", label: "Xem tất cả" },
    { id: "dong-phuc-the-thao", label: "Đồng phục thể thao" },
    { id: "dong-phuc-doanh-nghiep", label: "Đồng phục doanh nghiệp" },
  ];

  const filterMap = {
    all: () => true,
    "dong-phuc-the-thao": (project) => project.category === "Đồng phục thể thao",
    "dong-phuc-doanh-nghiep": (project) => project.category === "Đồng phục doanh nghiệp",
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(filterMap[filter] || filterMap.all);
  }, [filter]);

  const defaultMeta = {
    title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
    description:
      "Xem đánh giá từ khách hàng về đồng phục Univi: chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc. Gửi phản hồi của bạn ngay!",
    keywords:
      "phản hồi đồng phục Univi, đánh giá khách hàng, đồng phục chất lượng, đồng phục công ty, thiết kế đồng phục",
    author: "Đồng Phục Univi",
    robots: "index, follow",
    canonical: "https://dongphucunivi.com/feedback",
    og: {
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Đọc đánh giá từ khách hàng về đồng phục Univi. Chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
      type: "website",
        image: "/baner-univi.webp",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://dongphucunivi.com/feedback",
      siteName: "Đồng Phục Univi",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Khám phá phản hồi từ khách hàng về đồng phục Univi. Thiết kế miễn phí, giao hàng toàn quốc.",
      image: "",
      site: "@DongPhucUnivi",
    },
  };

  const safeMeta = {
    ...defaultMeta,
    ...meta,
    og: { ...defaultMeta.og, ...meta.og },
    twitter: { ...defaultMeta.twitter, ...meta.twitter },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: safeMeta.title,
    description: safeMeta.description,
    url: safeMeta.canonical,
    image: safeMeta.og.image,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: "https://dongphucunivi.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Phản hồi",
          item: safeMeta.canonical,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (projects || []).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.content,
        image: project.image,
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "Đồng Phục Univi",
      logo: {
        "@type": "ImageObject",
        url: "/baner-univi.webp",
      },
    },
  };

  return (
    <DefaultLayout2>
      <div className=" min-h-screen">
        <div className="relative min-h-[300px] w-full">
          <Image
            src={safeMeta.og.image}
            alt="Dự Án Đồng Phục - Đồng Phục Univi"
            fill={true}
            style={{ objectFit: "cover" }}
            className="opacity-70 brightness-75"
            priority={true}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6 md:p-10">
              <nav aria-label="Breadcrumb">
                <p className="text-sm uppercase text-white">
                  <Link href="/">
                    <span className="hover:text-[#105d97] cursor-pointer">
                      Trang chủ
                    </span>
                  </Link>{" "}
                  / Feedback
                </p>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Các dự án may đồng phục chuyên nghiệp Univi
              </h1>
              <p className="text-lg md:text-xl text-white mt-2">
                Khám phá các dự án đồng phục thể thao, đồng phục doanh nghiệp từ
               Univi. Thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-6">
          <div className="flex space-x-4 mb-6">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`pb-1 transition-colors duration-300 ${
                  filter === id
                    ? "text-[#105d97] border-b-2 border-[#105d97]"
                    : "text-gray-400"
                }`}
                aria-pressed={filter === id}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))
            ) : (
              <p role="alert" className="text-gray-400">
                Không có dự án nào phù hợp.
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  try {
    const meta = {
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Xem đánh giá từ khách hàng về đồng phục Univi: chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc. Gửi phản hồi của bạn ngay!",
      keywords:
        "phản hồi đồng phục Univi, đánh giá khách hàng, đồng phục chất lượng, đồng phục công ty, thiết kế đồng phục",
      author: "Đồng Phục Univi",
      robots: "index, follow",
      canonical: "https://dongphucunivi.com/feedback",
      og: {
        title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
        description:
          "Đọc đánh giá từ khách hàng về đồng phục Univi. Chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
        type: "website",
        image: "/baner-univi.webp",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://dongphucunivi.com/feedback",
        siteName: "Đồng Phục Univi",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
        description:
          "Khám phá phản hồi từ khách hàng về đồng phục Univi. Thiết kế miễn phí, giao hàng toàn quốc.",
        image: "/baner-univi.webp",
        site: "@DongPhucUnivi",
      },
    };

    return {
      props: {
        meta,
        structuredData: JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        meta: {
          title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
          description:
            "Xem đánh giá từ khách hàng về đồng phục Univi. Chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
          keywords:
            "phản hồi đồng phục Univi, đánh giá khách hàng, đồng phục chất lượng",
          canonical: "https://dongphucunivi.com/feedback",
          og: {
            title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
            description:
              "Đọc đánh giá từ khách hàng về đồng phục Univi.",
            image: "/images/feedback-univi.jpg",
          },
          twitter: {
            card: "summary_large_image",
            title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
            image: "/images/feedback-univi.jpg",
          },
        },
      },
    };
  }
}