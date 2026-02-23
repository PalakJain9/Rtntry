'use client';
import Link from 'next/link';
import '../app/globals.css'; 
import Image from "next/image";
import { useState, useEffect } from 'react';

interface Blog {
  slug: string;
  title: string;
  body: string;
  image: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  blogsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const BlogPallet = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlogs = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs?page=${page}&limit=15`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
        setPagination(data.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && pagination && page <= pagination.totalPages) {
      fetchBlogs(page);
    }
  };

  if (loading && !blogs.length) {
    return (
      <section
        id='blog'
        className='flex flex-col items-center w-[100vw] h-full universalPadding gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem]'
      >
        <h1 className='text-2xl lg:text-6xl'>
          The blogs every IT GIRL reads to level up.
        </h1>
        <div className="text-lg">Loading blogs...</div>
      </section>
    );
  }

  return (
    <section
      id='blog'
      className='flex flex-col items-center w-[100vw] h-full universalPadding gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem]'
    >
      <h1 className='text-2xl lg:text-6xl'>
        The blogs every IT GIRL reads to level up.
      </h1>

      {/* Blog count info */}
      {pagination && (
        <div className="text-center text-gray-600">
          Showing {blogs.length} of {pagination.totalBlogs} blogs
        </div>
      )}

      <div
        className='flex flex-row flex-wrap justify-center items-center w-full lg:w-5/6'
      >
        {/* blog pallet collection */}
        
        <ul
          className='flex flex-row flex-wrap justify-center items-center w-full gap-[0.75rem] lg:gap-[2rem]'
        >
          {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link 
              href={`/blog/${blog.slug}`}
            >
              <Image
                src={blog.image || '/placeholder-blog.jpg'} // Fallback image
                alt={blog.title}
                width={175}
                height={175}
                priority // Optional: loads image immediately
                style={{ objectFit: "contain" }}
              />
            </Link>
          </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="w-full flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="button border rounded-md text-black hover:bg-rose-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    currentPage === pageNum
                      ? 'bg-rose-100 border-black text-black'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="button border rounded-md text-black hover:bg-rose-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2"
            >
              Next
            </button>
          </div>
        )}

        {/* Loading indicator for page changes */}
        {loading && blogs.length > 0 && (
          <div className="text-center mt-4">
            <div className="text-gray-600">Loading...</div>
          </div>
        )}

        {/* pallet collection ends */}
      </div>
    </section>
  )
}

export default BlogPallet