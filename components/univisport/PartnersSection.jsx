import React from 'react';

const partners = [
  { name: 'Hillset', logo: '/khach-hang/1.jpg' },
  { name: 'Hillset', logo: '/khach-hang/2.jpg' },
  { name: 'Hillset', logo: '/khach-hang/3.jpg' },
  { name: 'Hillset', logo: '/khach-hang/4.jpg' },
  { name: 'Hillset', logo: '/khach-hang/5.jpg' },
  { name: 'Hillset', logo: '/khach-hang/6.jpg' },
  { name: 'Hillset', logo: '/khach-hang/7.jpg' },
  { name: 'Hillset', logo: '/khach-hang/8.jpg' },
  { name: 'Hillset', logo: '/khach-hang/9.jpg' },
  { name: 'Hillset', logo: '/khach-hang/10.jpg' },
  { name: 'Hillset', logo: '/khach-hang/11.jpg' },
  { name: 'Hillset', logo: '/khach-hang/12.jpg' },
  { name: 'Hillset', logo: '/khach-hang/13.jpg' },
  { name: 'Hillset', logo: '/khach-hang/15.jpg' },
];

const PartnersSection = () => {
  return (
    <div className="py-4 sm:py-6 md:py-8">
      <h2 className="text-center text-base sm:text-lg md:text-2xl font-bold text-[#105d97] mb-5 sm:mb-4 md:mb-10">
        ĐỐI TÁC & KHÁCH HÀNG
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 gap-2 sm:gap-4 md:gap-6 px-2 sm:px-3 md:px-4">
        {partners.map((partner, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 sm:h-12 md:h-32 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;