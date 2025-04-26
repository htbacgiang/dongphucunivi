import { useState, useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import { formatPosts, readPostsFromDb } from "../../lib/utils";
import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  posts: PostDetail[];
  meta: MetaData;
};

const Blogs: NextPage<Props> = ({ posts, meta }) => {
  const postsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [currentPage, posts]);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DefaultLayout2>
    
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/banner5.png" // Update with Univi-specific banner
          alt="Tin tức - Đồng phục Univi"
          layout="fill"
          objectFit="cover"
          className="opacity-70 brightness-75"
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
                / Tin tức
              </p>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Tin tức - Đồng phục Univi
            </h1>
            <p className="text-lg md:text-xl text-white mt-2">
              Khám phá các bài viết về đồng phục, xu hướng thiết kế và kinh
              nghiệm chọn đồng phục chất lượng.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-12 bg-black">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-8xl mx-auto px-4 lg:px-12">
          <div className="w-full lg:w-9/12">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-6 bg-black text-white py-8">
                  {paginatedPosts.map((post, index) => (
                    <div
                      key={post.slug}
                      className="w-full md:w-[calc(50%-1.5rem)] flex flex-col gap-4"
                    >
                      {post.thumbnail && (
                        <div
                          className="relative cursor-pointer rounded-lg overflow-hidden"
                          style={{ aspectRatio: "16/9" }}
                        >
                          <Link href={`/bai-viet/${post.slug}`}>
                            <Image
                              src={post.thumbnail}
                              fill={true}
                              priority={index < 2}
                              className="object-cover hover:scale-105 transition-all ease duration-300"
                              alt={post.title}
                            />
                          </Link>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-orange-500 uppercase">
                          {formatDate(post.createdAt)} - {post.category}
                        </p>
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="text-xl md:text-2xl font-bold hover:text-green-600 text-green-500"
                          aria-label={post.title}
                        >
                          {post.title}
                        </Link>
                      
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="text-sm text-gray-400 uppercase hover:text-green-500"
                        >
                          Xem thêm
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-6">
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-transparent text-white border border-white hover:bg-orange-500 hover:text-white transition-all duration-300"
                        aria-label="Previous page"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentPage === page
                              ? "bg-orange-500 text-white"
                              : "bg-transparent text-white border border-white hover:bg-orange-500 hover:text-white"
                          } transition-all duration-300`}
                          aria-label={`Go to page ${page}`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-transparent text-white border border-white hover:bg-orange-500 hover:text-white transition-all duration-300"
                        aria-label="Next page"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Không có bài viết nào.</p>
              </div>
            )}
          </div>
          <div className="w-full lg:w-3/12 flex flex-col gap-6 bg-black text-white py-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                aria-label="Search articles"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold uppercase">
                Bài viết gần đây
              </h3>
              {posts.slice(0, 3).map((post) => (
                <div key={post.slug} className="flex flex-row gap-4">
                  {post.thumbnail && (
                    <div
                      className="w-3/6 relative cursor-pointer rounded-lg overflow-hidden"
                      style={{ aspectRatio: "1/1", maxHeight: "100px" }}
                    >
                      <Link href={`/tin-tuc/${post.slug}`}>
                        <Image
                          src={post.thumbnail}
                          fill={true}
                          className="object-cover hover:scale-105 transition-all ease duration-300"
                          alt={post.title}
                        />
                      </Link>
                    </div>
                  )}
                  <div className="w-3/4 flex flex-col gap-1">
                    <p className="text-base text-orange-500 uppercase">
                      {formatDate(post.createdAt)}
                    </p>
                    <Link
                      href={`/tin-tuc/${post.slug}`}
                      className="text-base font-medium hover:text-orange-500 line-clamp-2"
                      aria-label={post.title}
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout2>
  );
};

export const getServerSideProps: GetServerSideProps<{
  posts: PostDetail[];
  meta: MetaData;
}> = async () => {
  try {
    const limit = 100; // Increased limit to support pagination
    const posts = await readPostsFromDb(8, 0);
    const formattedPosts = formatPosts(posts);
    const meta: MetaData = {
      title: "Tin tức - Đồng phục Univi",
      description:
        "Cập nhật các bài viết mới nhất về đồng phục, xu hướng thiết kế và kinh nghiệm chọn đồng phục chất lượng từ Đồng phục Univi.",
      keywords:
        "đồng phục, thiết kế đồng phục, đồng phục công ty, đồng phục học sinh, Univi",
      author: "Đồng phục Univi",
      robots: "index, follow",
      canonical: "https://univi.com/tin-tuc",
      og: {
        title: "Tin tức - Đồng phục Univi",
        description:
          "Khám phá các bài viết về đồng phục và mẹo chọn đồng phục từ Đồng phục Univi để nâng tầm phong cách.",
        type: "website",
        image: "https://univi.com/images/dong-phuc-1.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://univi.com/tin-tuc",
        siteName: "Đồng phục Univi",
      },
      twitter: {
        card: "summary_large_image",
        title: "Tin tức - Đồng phục Univi",
        description:
          "Tìm hiểu về đồng phục và các xu hướng thiết kế mới nhất từ Đồng phục Univi.",
        image: "https://univi.com/images/dong-phuc-1.jpg",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
        meta: {
          title: "Tin tức - Đồng phục Univi",
          description: "Đã xảy ra lỗi khi tải bài viết.",
          keywords: "đồng phục, Univi",
          author: "Đồng phục Univi",
          robots: "noindex",
          canonical: "https://univi.com/tin-tuc",
          og: {
            title: "Tin tức - Đồng phục Univi",
            description: "Đã xảy ra lỗi khi tải bài viết.",
            type: "website",
            image: "https://univi.com/images/dong-phuc-1.jpg",
            imageWidth: "1200",
            imageHeight: "630",
            url: "https://univi.com/tin-tuc",
            siteName: "Đồng phục Univi",
          },
          twitter: {
            card: "summary_large_image",
            title: "Tin tức - Đồng phục Univi",
            description: "Đã xảy ra lỗi khi tải bài viết.",
            image: "https://univi.com/images/dong-phuc-1.jpg",
          },
        },
      },
    };
  }
};

export default Blogs;