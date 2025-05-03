import ProjectCard from "../../components/tantruonggiang/ProjectCard";
import { projects } from "../../components/tantruonggiang/data/projects";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import ContactForm from "../../components/header/ContactForm";

export default function DuAn({ meta = {} }) {
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  const FILTERS = [
    { id: "all", label: "Xem tất cả" },
    { id: "cong-so", label: "Đồng phục công sở" },
    { id: "bao-ho", label: "Đồng phục bảo hộ" },
    { id: "khach-san", label: "Đồng phục khách sạn" },
  ];

  const filterMap = {
    all: () => true,
    "cong-so": (project) => project.category === "Công sở",
    "bao-ho": (project) => project.category === "Bảo hộ",
    "khach-san": (project) => project.category === "Khách sạn",
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(filterMap[filter] || filterMap.all);
  }, [filter]);

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (firstElement) firstElement.focus();
    modal.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen]);

  const defaultMeta = {
    title: "Danh Sách Dự Án Đồng Phục – Đồng Phục Univi",
    description:
      "Khám phá các dự án may đồng phục chuyên nghiệp của Đồng Phục Univi: đồng phục công sở, bảo hộ, khách sạn. Dịch vụ thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.",
    keywords:
      "đồng phục Univi, may đồng phục, đồng phục công ty, đồng phục công sở, đồng phục bảo hộ, đồng phục khách sạn, thiết kế đồng phục",
    author: "Đồng Phục Univi",
    robots: "index, follow",
    canonical: "https://dongphucunivi.com/du-an",
    og: {
      title: "Danh Sách Dự Án Đồng Phục – Đồng Phục Univi",
      description:
        "Xem các dự án đồng phục cao cấp từ Đồng Phục Univi: công sở, bảo hộ, khách sạn. Thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.",
      type: "website",
      image: "/images/dong-phuc-Univi.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://dongphucunivi.com/du-an",
      siteName: "Đồng Phục Univi",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Danh Sách Dự Án – Đồng Phục Univi",
      description:
        "Danh sách dự án đồng phục chuyên nghiệp từ Đồng Phục Univi: công sở, bảo hộ, khách sạn. Thiết kế miễn phí, giao hàng toàn quốc.",
      image: "/images/dong-phuc-Univi.jpg",
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
          name: "Dự án",
          item: safeMeta.canonical,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (projects || []).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://dongphucunivi.com/du-an/${project.slug}`,
        name: project.title,
        image: project.image,
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "Đồng Phục Univi",
      logo: {
        "@type": "ImageObject",
        url: "/images/Univi-logo.png",
      },
    },
  };

  return (
    <DefaultLayout2>
      <Head>
        <title>{safeMeta.title}</title>
        <meta name="description" content={safeMeta.description} />
        <meta name="keywords" content={safeMeta.keywords} />
        <meta name="author" content={safeMeta.author} />
        <meta name="robots" content={safeMeta.robots} />
        <link rel="canonical" href={safeMeta.canonical} />
        <meta property="og:title" content={safeMeta.og.title} />
        <meta property="og:description" content={safeMeta.og.description} />
        <meta property="og:type" content={safeMeta.og.type} />
        <meta property="og:image" content={safeMeta.og.image} />
        <meta property="og:image:width" content={safeMeta.og.imageWidth} />
        <meta property="og:image:height" content={safeMeta.og.imageHeight} />
        <meta property="og:url" content={safeMeta.og.url} />
        <meta property="og:site_name" content={safeMeta.og.siteName} />
        <meta property="og:locale" content={safeMeta.og.locale} />
        <meta name="twitter:card" content={safeMeta.twitter.card} />
        <meta name="twitter:title" content={safeMeta.twitter.title} />
        <meta name="twitter:description" content={safeMeta.twitter.description} />
        <meta name="twitter:image" content={safeMeta.twitter.image} />
        <meta name="twitter:site" content={safeMeta.twitter.site} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className="bg-black text-white min-h-screen">
        <div className="relative min-h-[400px] w-full">
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
                <p className="text-sm uppercase text-gray-400">
                  <Link href="/">
                    <span className="hover:text-yellow-500 cursor-pointer">
                      Trang chủ
                    </span>
                  </Link>{" "}
                  / Dự án
                </p>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Các dự án may đồng phục chuyên nghiệp Univi
              </h1>
              <p className="text-lg md:text-xl text-white mt-2">
                Khám phá các dự án đồng phục công sở, bảo hộ, khách sạn từ Đồng
                Phục Univi. Thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.
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
                    ? "text-yellow-500 border-b-2 border-yellow-500"
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
                  onQuoteClick={toggleForm}
                />
              ))
            ) : (
              <p role="alert" className="text-gray-400">
                Không có dự án nào phù hợp.
              </p>
            )}
          </div>
        </div>

        {isFormOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) toggleForm();
            }}
          >
            <div
              ref={modalRef}
              className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl relative bg-white"
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={toggleForm}
                aria-label="Đóng form"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  try {
    const projectImage = projects?.[0]?.image || "/images/dong-phuc-Univi.jpg";

    const meta = {
      title: "Danh Sách Dự Án – Đồng Phục Univi",
      description:
        "Xem các dự án may đồng phục chuyên nghiệp từ Đồng Phục Univi: đồng phục công sở, bảo hộ, khách sạn. Dịch vụ thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.",
      keywords:
        "đồng phục Univi, may đồng phục, đồng phục công ty, đồng phục công sở, đồng phục bảo hộ, đồng phục khách sạn, thiết kế đồng phục",
      author: "Đồng Phục Univi",
      robots: "index, follow",
      canonical: "https://dongphucunivi.com/du-an",
      og: {
        title: "Danh Sách Dự Án Đồng Phục – Đồng Phục Univi",
        description:
          "Khám phá các dự án đồng phục cao cấp từ Đồng Phục Univi: công sở, bảo hộ, khách sạn. Thiết kế miễn phí, may đo tận nơi, giao hàng toàn quốc.",
        type: "website",
        image: projectImage,
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://dongphucunivi.com/du-an",
        siteName: "Đồng Phục Univi",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "Danh Sách Dự Án – Đồng Phục Univi",
        description:
          "Danh sách dự án đồng phục chuyên nghiệp từ Đồng Phục Univi: công sở, bảo hộ, khách sạn. Thiết kế miễn phí, giao hàng toàn quốc.",
        image: projectImage,
        site: "@DongPhucUnivi",
      },
    };

    return {
      props: {
        meta,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        meta: {
          title: "Danh Sách Dự Án – Đồng Phục Univi",
          description:
            "Xem các dự án may đồng phục chuyên nghiệp từ Đồng Phục Univi: công sở, bảo hộ, khách sạn. Thiết kế miễn phí, giao hàng toàn quốc.",
          canonical: "https://dongphucunivi.com/du-an",
        },
      },
    };
  }
}