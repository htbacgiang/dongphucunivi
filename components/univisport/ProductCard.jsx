import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ id, name, description, price, discountPrice, discount, isNew, isFeatured, colors, image, slug, layout }) => {
  const [selectedColorImage, setSelectedColorImage] = useState(image);

  const handleColorChange = (img) => {
    setSelectedColorImage(img);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${layout === 'list' ? 'flex' : 'block'}`}>
      {layout === 'list' ? (
        <>
          {/* Image */}
          <div className="relative md:w-1/6 w-2/4 aspect-[3/4]">
            <Image src={selectedColorImage} alt={name} fill className="object-cover rounded-t-lg" />
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {isNew && <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Mới</span>}
              {discount > 0 && <span className="bg-[#105d97] text-white text-sm font-semibold px-3 py-1 rounded-full">-{discount}% OFF</span>}
              {isFeatured && <span className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full">Nổi Bật</span>}
            </div>
          </div>

          {/* Info */}
          <div className="w-2/3 p-4">
            <Link href={`/san-pham/${slug}`} legacyBehavior>
              <a>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
                  {description || 'Không có mô tả sản phẩm.'}
                </p>
              </a>
            </Link>

            {/* Price */}
            <div className="mt-3 font-semibold flex items-center">
              {discount > 0 ? (
                price ? (
                  <span className="text-lg text-[#105d97]">
                    Chỉ từ {discountPrice.toLocaleString('vi-VN')}đ đến {price.toLocaleString('vi-VN')}đ
                  </span>
                ) : (
                  <span className="text-lg text-[#105d97]">
                    Chỉ từ {discountPrice.toLocaleString('vi-VN')}đ
                  </span>
                )
              ) : (
                <span className="text-lg text-gray-800">
                  {price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="flex justify-start space-x-2 py-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    handleColorChange(color.image);
                  }}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${selectedColorImage === color.image ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Chọn màu ${color.name}`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href={`/san-pham/${slug}`} legacyBehavior>
            <a className="block">
              <div className="relative w-full aspect-[3/4]">
                <Image src={selectedColorImage} alt={name} fill className="object-cover rounded-t-lg" />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {isNew && <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Mới</span>}
                  {discount > 0 && <span className="bg-[#105d97] text-white text-sm font-semibold px-3 py-1 rounded-full">-{discount}% OFF</span>}
                  {isFeatured && <span className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full">Nổi Bật</span>}
                </div>
              </div>
              <div className="px-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
              </div>
            </a>
          </Link>

          {/* Price */}
          <div className=" px-4 font-semibold flex items-center">
            {discount > 0 ? (
              price ? (
                <span className="text-lg  text-[#105d97]">
                  Chỉ từ {discountPrice.toLocaleString('vi-VN')}đ đến {price.toLocaleString('vi-VN')}đ
                </span>
              ) : (
                <span className="text-lg  text-[#105d97]">
                  Chỉ từ {discountPrice.toLocaleString('vi-VN')}đ
                </span>
              )
            ) : (
              <span className="text-lg  text-gray-800">
                {price.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>


          {/* Colors */}
          <div className="flex justify-center space-x-2 py-2 px-4">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleColorChange(color.image);
                }}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${selectedColorImage === color.image ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Chọn màu ${color.name}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
