import Image from "next/image";
import { useState } from "react";
import AlbumVN from "../../components/album/listAlbum/Vietnam";
import DefaultLayout from "../../components/layout/DefaultLayout";

const AlbumList = () => {
  const [selectedAlbum, setSelectedAlbum] = useState("Việt Nam quê hương tôi");

  const handleAlbumClick = (albumName) => {
    setSelectedAlbum(albumName);
  };

  const renderAlbumComponent = () => {
    switch (selectedAlbum) {
      case "Việt Nam quê hương tôi":
        return <AlbumVN />;

      default:
        return null;
    }
  };

  const albums = [
    { title: "Việt Nam quê hương tôi", image: "/blog/blogpost1.jpg" },

  ];

  return (
    <DefaultLayout>
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Phần danh mục album */}
          <div className="pt-12">
            <div className="text-center ">
              <h3 className="text-2xl font-semibold text-[#105d97] uppercase mb-2">
                ALBUM ẢNH
              </h3>
              <h2 className="text-2xl md:text-3xl font-bold font-heading">
                Feedback của khách hàng cho{" "}
                <span className="text-[#105d97]">Đồng Phục Univi</span>
              </h2>
            </div>
          </div>
          {/* Hiển thị component album được chọn */}
          <div className="">{renderAlbumComponent()}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps() {
  const meta = {
    title: "Feedback Đồng Phục Univi",
    description:
      "Khám phá bộ sưu tập ảnh feedback từ khách hàng của Đồng Phục Univi, thể hiện chất lượng và sự hài lòng với các sản phẩm đồng phục chuyên nghiệp.",
    keywords:
      "feedback đồng phục univi, đồng phục univi, hình ảnh khách hàng, đồng phục chất lượng",
    robots: "index, follow",
    canonical: "https://truongnq.vn/feedback-univi",
    og: {
      title: "Feedback Đồng Phục Univi",
      description:
        "Khám phá bộ sưu tập ảnh feedback từ khách hàng của Đồng Phục Univi, thể hiện chất lượng và sự hài lòng.",
      type: "website",
      url: "https://truongnq.vn/feedback-univi",
      image: "https://truongnq.vn/images/customer1.webp",
      imageWidth: "1200",
      imageHeight: "630",
      siteName: "Trường NQ Web",
    },
    twitter: {
      card: "summary_large_image",
      title: "Feedback Đồng Phục Univi ",
      description:
        "Khám phá bộ sưu tập ảnh feedback từ khách hàng của Đồng Phục Univi.",
      image: "https://truongnq.vn/images/customer1.webp",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
export default AlbumList;