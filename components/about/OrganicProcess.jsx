import Image from 'next/image';

const steps = [
  {
    imgSrc: '/images/step-1.webp',
    alt: 'Icon for planning step',
    title: 'Lên kế hoạch',
    description: 'Lập kế hoạch chi tiết cho quy trình canh tác hữu cơ để đảm bảo hiệu quả.',
  },
  {
    imgSrc: '/images/step-2.webp',
    alt: 'Icon for seedling step',
    title: 'Ươm mầm',
    description: 'Gieo hạt và chăm sóc cây non để đảm bảo phát triển tốt nhất.',
  },
  {
    imgSrc: '/images/step-4.webp', // Assuming a unique image for Quality Control
    alt: 'Icon for quality control step',
    title: 'Kiểm soát chất lượng',
    description: 'Kiểm tra kỹ lưỡng chất lượng sản phẩm trong từng giai đoạn.',
  },
  {
    imgSrc: '/images/step-3.webp',
    alt: 'Icon for marketing step',
    title: 'Marketing',
    description: 'Đưa sản phẩm ra thị trường với các chiến lược tiếp thị hiệu quả.',
  },
];

const OrganicProcess = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            src="/images/4.webp"
            alt="Sản phẩm hữu cơ và tinh khiết"
            width={800} // Adjust based on actual image size
            height={400} // Adjust based on actual image size
            className="mx-auto md:w-2/5 w-4/5"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp" // Optional: Add a low-res placeholder
          />
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-8 items-center justify-center">
          {steps.map((step, index) => (
            <div key={index} className="group text-center">
              <Image
                src={step.imgSrc}
                alt={step.alt}
                width={64} // Matches w-16 (16 * 4 = 64px)
                height={64} // Matches h-16
                className="mx-auto transition-transform duration-300 group-hover:-translate-y-2"
                placeholder="blur"
                blurDataURL="/images/placeholder.webp" // Optional
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block text-center">
                  <Image
                    src={`/images/step-arrow-${(index % 2) + 1}.webp`}
                    alt="Arrow between steps"
                    width={40} // Adjust based on actual arrow size
                    height={20} // Adjust based on actual arrow size
                    className="mx-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganicProcess;