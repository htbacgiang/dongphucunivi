import { useRouter } from "next/router";
import Head from "next/head";
import { projects } from "../../components/tantruonggiang/data/projects";
import PropertyDetail from "../../components/tantruonggiang/PropertyDetail";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";

export default function ProjectDetail({ meta }) {
  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady) {
    return <div className="text-white">Đang tải...</div>;
  }

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white">Dự án không tồn tại</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: `Feedback hình ảnh đồng phục ${project.category.toLowerCase()} cho ${project.customer} từ Đồng phục Univi. Thiết kế chuyên nghiệp, hiện đại, phù hợp với nhu cầu sử dụng.`,
    image: project.image || "/images/dong-phuc-default.jpg",
    author: {
      "@type": "Organization",
      name: "Đồng phục Univi",
    },
    url: `https://dongphucunivi.com/feedback/${project.slug}`,
  };

  return (
    <DefaultLayout2>

      <PropertyDetail project={project} />
    </DefaultLayout2>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      return {
        notFound: true,
      };
    }

    const meta = {
      title: `${project.title} – Feedback Đồng phục Univi`,
      description: `Xem hình ảnh feedback đồng phục ${project.category.toLowerCase()} cho ${project.customer} từ Đồng phục Univi. Thiết kế hiện đại, chuyên nghiệp, đáp ứng nhu cầu doanh nghiệp và thể thao.`,
      keywords: `đồng phục, feedback đồng phục, Đồng phục Univi, ${project.title}, ${project.category.toLowerCase()}, thiết kế đồng phục, đồng phục thể thao, đồng phục doanh nghiệp`,
      author: "Đồng phục Univi",
      robots: "index, follow",
      canonical: `https://dongphucunivi.com/feedback/${project.slug}`,
      og: {
        title: `${project.title} – Feedback Đồng phục Univi`,
        description: `Feedback đồng phục ${project.category.toLowerCase()} cho ${project.customer} bởi Đồng phục Univi. Thiết kế chuyên nghiệp, hiện đại.`,
        type: "website",
        image: project.image || "/images/dong-phuc-default.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: `https://dongphucunivi.com/feedback/${project.slug}`,
        siteName: "Đồng phục Univi",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} – Feedback Đồng phục Univi`,
        description: `Feedback đồng phục ${project.category.toLowerCase()} cho ${project.customer} từ Đồng phục Univi.`,
        image: project.image || "/images/dong-phuc-default.jpg",
        site: "@DongphucUnivi",
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
      notFound: true,
    };
  }
}