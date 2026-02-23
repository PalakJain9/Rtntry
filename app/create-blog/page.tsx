'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/navbar';
import Footer from '@/app/footer';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('JOURNAL.png'); // Default to local image
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      const blog = await response.json();
      setSuccess(true);
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setTitle('');
        setBody('');
        setImage('');
        setSuccess(false);
        router.push(`/blog/${blog.slug}`);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start w-[100vw] overflow-x-hidden gap-[1rem]">
      <Navbar />
      <div className="positionFromtop w-full flex flex-col justify-center items-center gap-[3rem]">
        <div className="blogPagePadding w-full flex flex-col gap-[2rem] justify-center items-start">
          <h1 className="text-2xl md:text-3xl lg:text-5xl">Create New Blog</h1>
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Blog created successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[1.5rem]">
            <div className="flex flex-col gap-[0.5rem]">
              <label htmlFor="title" className="font-semibold text-lg">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your blog title..."
                required
              />
            </div>

            <div className="flex flex-col gap-[0.5rem]">
              <label htmlFor="image" className="font-semibold text-lg">
                Banner Image (from public folder)
              </label>
              <select
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="JOURNAL.png">JOURNAL.png</option>
                <option value="logo.svg">logo.svg</option>
                <option value="">No image</option>
              </select>
              <p className="text-sm text-gray-600">
                Place images in the /public folder and they'll appear here
              </p>
            </div>

            <div className="flex flex-col gap-[0.5rem]">
              <label htmlFor="body" className="font-semibold text-lg">
                Blog Body *
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[400px]"
                placeholder="Write your blog content here (supports Markdown)..."
                required
              />
            </div>

            <div className="flex gap-[1rem]">
              <button
                type="submit"
                disabled={isLoading}
                className="button border rounded-md text-black hover:bg-rose-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2"
              >
                {isLoading ? 'Creating...' : 'Create Blog'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/#blog')}
                className="button border rounded-md text-black hover:bg-gray-100 transition-all px-6 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
