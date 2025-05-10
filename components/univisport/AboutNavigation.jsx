import { useState, useMemo } from "react";

export default function AboutNavigation() {
  const [activeItem, setActiveItem] = useState("2017: Thành Lập");

  const menuItems = useMemo(
    () => [
      {
        title: "2017: Thành Lập",
        description:
          "Đồng Phục Univi chính thức được thành lập tại Hà Đông, Hà Nội, với xưởng sản xuất đầu tiên đặt tại Sóc Sơn. Giai đoạn đầu, Univi tập trung vào thiết kế và sản xuất các dòng đồng phục cho doanh nghiệp, công ty, đồng phục công sở như áo sơ mi, áo polo, đồng phục teambuilding cho các doanh nghiệp vừa và nhỏ. Công ty TNHH Bảo Phong Evenes – tiền thân của Univi, được thành lập vào tháng 7/2017, đánh dấu bước đi đầu tiên trên hành trình xây dựng thương hiệu.",
      },
      {
        title: "2017-2019: Khởi Đầu",
        description:
          "Trong những năm đầu, Univi hoạt động với quy mô nhỏ, cơ sở vật chất còn hạn chế và chưa có nhiều tiếng vang trên thị trường. Tuy nhiên, bằng tinh thần khởi nghiệp mãnh liệt và đam mê không ngừng nghỉ của đội ngũ sáng lập trẻ tuổi, Univi từng bước khẳng định sự hiện diện của mình trong ngành đồng phục.",
      },
      {
        title: "2020-2021: Khẳng Định Thương Hiệu",
        description:
          "Univi bắt đầu gặt hái thành công, trở thành một trong những đơn vị uy tín trong lĩnh vực đồng phục doanh nghiệp và sự kiện. Nhờ tích lũy kinh nghiệm thực tế, kết hợp cùng khả năng tổ chức đội ngũ và mở rộng hệ thống, các sản phẩm đồng phục mang thương hiệu Univi đã có mặt tại hầu hết các tỉnh thành trên cả nước.",
      },
      {
        title: "2021-2022: Vượt Đại Dịch",
        description:
          "Đại dịch Covid-19 mang đến thách thức chưa từng có. Tuy nhiên, bằng sự lãnh đạo quyết liệt và tinh thần đoàn kết, Univi không chỉ đứng vững mà còn lan tỏa hình ảnh của một doanh nghiệp gắn bó, nhân văn và bản lĩnh. Trong giai đoạn này, công ty mở rộng quy mô sản xuất với xưởng mới tại Hải Dương, bổ sung nguồn lực để chuẩn bị cho những bước đi tiếp theo.",
      },
      {
        title: "2023-2025: Chuyển Hướng Thể Thao",
        description:
          "Từ nền tảng là một đội ngũ đam mê nghiên cứu chuyên sâu về chất liệu, Univi nhận thấy thị trường Đồng Phục Thể Thao tại Việt Nam hiện nay chưa thực sự chú trọng vào yếu tố chất liệu, hiệu suất tập luyện và bảo vệ sức khỏe người mặc. Qua quá trình khảo sát thực tế với vận động viên và người tập luyện phổ thông, Univi phát hiện một vấn đề phổ biến của đại đa số những người thường xuyên luyện tập thể thao đó chính là tỷ lệ chấn thương cơ, khớp làm cản trở hiệu suất tập luyện và sức khỏe tổng thể. Với sứ mệnh đồng hành cùng các đội nhóm, chuỗi phòng tập và doanh nghiệp tổ chức hoạt động thể thao, Univi quyết định tái định hướng chiến lược, đầu tư nguồn lực vào nghiên cứu, thiết kế và sản xuất Đồng phục Thể thao chuyên sâu, lấy hiệu suất, sự thoải mái và sức khỏe người tập làm trung tâm.",
      },
    ],
    []
  );

  return (
    <section className="relative min-h-screen bg-white">
      <div className="relative z-10 container mx-auto px-4 py-10 h-full flex flex-col items-center">
        <nav
          role="navigation"
          aria-label="Company Timeline"
          className="w-full space-y-4"
        >
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveItem(item.title)}
              aria-current={activeItem === item.title ? "true" : "false"}
              aria-label={`View details for ${item.title}`}
              className={`w-full text-left cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                activeItem === item.title
                  ? "bg-[#105d97] bg-opacity-10 border-l-4 border-[#105d97]"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3
                className={`text-lg font-bold uppercase tracking-widest mb-2 ${
                  activeItem === item.title ? "text-[#105d97]" : "text-black"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-base  ${
                  activeItem === item.title ? "text-black" : "text-black"
                }`}
              >
                {item.description}
              </p>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}