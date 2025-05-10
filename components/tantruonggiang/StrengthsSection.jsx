import Image from "next/image";

export default function ServicesSection() {
  const services = [
    {
      imageSrc: "/images/chat-lieu-vai.webp",
      alt: "CHẤT LIỆU & CÔNG NGHỆ VẢI",
      title: "CCHẤT LIỆU & CÔNG NGHỆ VẢI",
      description:
      "Đồng phục UNIVI tập trung phát triển các dòng vải thể thao chuyên dụng (Quick Dry, Super Cool, Blended) đáp ứng được nhiều bộ môn thể thao. Với công nghệ UNI DRY độc quyền, đảm bảo thoáng khí, thoát ẩm tốt, mềm mại, bền màu tạo sự khác biệt vượt trội.Đặc biệt tất cả dòng vải của Univi đều có kiểm định an toàn với da (không chứa Formaldehyde, Amin thơm Azo)"
    },
    {
      imageSrc: "/images/quy-trinh-kep-kin.webp",
      alt: "Quy Trình Sản Xuất Khép Kín",
      title: "SẢN XUẤT KHÉP KÍN - TỐI ƯU CHI PHÍ",
      description:
      "Sở hữu xưởng sản xuất lớn với đội ngũ lành nghề, Đồng phục Univi kiểm soát chất lượng tất cả các quy trình. Không qua trung gian, tối ưu hóa giá thành giúp đối tác tiết kiệm 30- 40% chi phí."
    },
    {
      imageSrc: "/images/san-xuat-nhanh.webp",
      alt: "SẢN XUẤT NHANH",
      title: "SẢN XUẤT NHANH",
      description:
      "Univi sử hữu kho vải với trữ lượng vải lớn. Đồng thời luôn sẵn hàng trong trong kho 200+ mẫu thiết của nhiều bộ môn thể thao. Đáp ứng được nhu cầu của các đối tác cần gấp, đồng phục có thể giao ngay sau 3 ngày đặt hàng."
    },
  ];

  return (
    <section className="bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white uppercase">
          Thế Mạnh Của Đồng phục UNIVI 
          </h2>
          <p className="text-gray-300 mt-4 text-sm md:text-base leading-relaxed max-w-5xl mx-auto">
            Đồng phục UNIVI chuyên cung cấp các giải pháp vải công nghệ cao và đồng phục thể thao chuyên nghiệp, ứng dụng quy trình sản xuất khép kín và công nghệ tiên tiến, mang đến sản phẩm chất lượng, bền vững và phù hợp với nhu cầu khách hàng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full h-48 md:h-64">
                <Image
                  src={service.imageSrc}
                  alt={service.alt}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-lg"
                  onError={(e) => (e.currentTarget.src = "/images/fallback.png")}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-300 mt-4 uppercase">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base text-center mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}