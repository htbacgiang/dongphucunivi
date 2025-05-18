import Head from "next/head";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ContactForm from "../../components/header/ContactForm";

const contactInfo = {
  address: "Nhà D4, Ng. 180 Đ. Thanh Bình, Hà Đông, Hà Nội",
  email: "Yenlb.univi@gmail.com",
  phone: "0834.204.999",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dongphucunivi.com";

export default function ContactPage({ meta }) {
  return (
    <>
      <DefaultLayout>
        <section className="min-h-screen py-10 ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-black text-center mb-10 mt-10 md:mt-20">
              Liên Hệ
            </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center mb-12">
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin địa chỉ"
              >
                <div className="text-white text-4xl mb-4 flex justify-center">
                  <MdLocationOn aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Địa chỉ</h3>
                <p className="text-gray-400">{contactInfo.address}</p>
              </div>
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin email"
              >
                <div className="text-white text-4xl mb-4 flex justify-center">
                  <MdEmail aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">E-Mail</h3>
                <p className="text-gray-400">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className=" transition-colors focus:outline-none focus:ring-2 "
                    aria-label={`Gửi email đến ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin số điện thoại"
              >
                <div className="text-white text-4xl mb-4 flex justify-center">
                  <MdPhone aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Số điện thoại</h3>
                <p className="text-gray-400">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className=" transition-colors focus:outline-none focus:ring-2"
                    aria-label={`Gọi số ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Liên Hệ – Đồng phục Univi",
    description:
      "Liên hệ với Đồng phục Univi qua địa chỉ, email và số điện thoại. Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp thắc mắc của bạn về đồng phục.",
    keywords:
      "liên hệ, Đồng phục Univi, địa chỉ, email, số điện thoại, đồng phục, may đồng phục",
    author: "Đồng phục Univi",
    robots: "index, follow",
    canonical: 'https://dongphucunivi.com/lien-he',
    og: {
      title: "Liên Hệ – Đồng phục Univi",
      description:
        "Liên hệ với Đồng phục Univi qua địa chỉ, email và số điện thoại để được tư vấn về may đồng phục chất lượng cao.",
      type: "website",
      image:'https://dongphucunivi.com/images/banner-univi.webp',
      imageWidth: "1200",
      imageHeight: "630",
      url: 'https://dongphucunivi.com/lien-he',
      siteName: "Đồng phục Univi",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên Hệ – Đồng phục Univi",
      description:
        "Liên hệ với Đồng phục Univi để được tư vấn về may đồng phục chất lượng cao.",
      image: 'https://dongphucunivi.com/images/banner-univi.webp',
      site: "@DongphucUnivi", // Updated to reflect brand
    },
  };

  return { props: { meta } };
}