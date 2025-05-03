import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image

const albums = [
  {
    href: '/album/viet-nam-que-huong-toi',
    title: 'Việt Nam quê hương tôi',
    imgSrc: '/blog/blogpost1.jpg',
    alt: 'Việt Nam quê hương tôi',
  },
  {
    href: '/album/ha-tay-que-lua',
    title: 'Hà Tây quê lụa',
    imgSrc: '/blog/blogpost2.jpg',
    alt: 'Hà Tây quê lụa',
  },
  {
    href: '/album/truong-va-nhung-nguoi-ban',
    title: 'Trường và những người bạn',
    imgSrc: '/blog/blogpost3.jpg',
    alt: 'Trường và những người bạn',
  },
  {
    href: '/album/bsa',
    title: 'BSA',
    imgSrc: '/blog/blogpost4.jpg',
    alt: 'BSA',
  },
  {
    href: '/album/bus-ha-noi',
    title: 'Xe bus Hà Nội',
    imgSrc: '/blog/blogpost5.jpg',
    alt: 'Xe bus Hà Nội',
  },
  {
    href: '/album/design',
    title: 'Design',
    imgSrc: '/blog/blogpost6.jpg',
    alt: 'Design',
  },
  {
    href: '/album/co-vai-thu-dang-yeu',
    title: 'Có vài thứ đáng yêu',
    imgSrc: '/blog/blogpost7.jpg',
    alt: 'Có vài thứ đáng yêu',
  },
  {
    href: '/album/nhat-ban-den-va-yeu',
    title: 'Nhật Bản đến và yêu',
    imgSrc: '/blog/blogpost8.jpg',
    alt: 'Nhật Bản đến và yêu',
  },
];

const Gallery = () => {
  return (
    <section aria-labelledby="album-heading">
      <div className="container mx-auto p-4">
        <div id="latest-blog">
          <div className="text-center mb-8">
            <Link href="/album">
              <h2 id="album-heading" className="text-3xl font-bold text-gray-800">
                ALBUM ẢNH
              </h2>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div key={album.href} className="blog-post">
                <Link href={album.href}>
                  <div className="blog-thumb overflow-hidden">
                    <Image
                      src={album.imgSrc}
                      alt={album.alt}
                      width={300} // Adjust based on your design
                      height={200} // Adjust based on your design
                      className="w-full rounded-lg transition-transform duration-300"
                      placeholder="blur" // Optional: Add blur effect
                      blurDataURL="/blog/placeholder.jpg" // Optional: Low-res placeholder
                    />
                  </div>
                </Link>
                <div className="img-content mt-2 text-center">
                  <h4>
                    <Link href={album.href}>{album.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;