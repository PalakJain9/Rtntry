import { blogs } from '@/data/blogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/app/navbar';
import Footer from '@/app/footer';
import Link from 'next/link';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// generateMetadata gets props, await props.params before use
export async function generateMetadata(props: { params: Promise<BlogPageProps['params']> }): Promise<Metadata> {
  const params = await props.params; // await params here!
  const slug = params.slug;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return { title: blog.title };
}

// Page also needs to await params before accessing slug
export default async function BlogPage(props: { params: Promise<BlogPageProps['params']> }) {
  const params = await props.params; // await here
  const slug = params.slug;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div
      className="flex flex-col justify-center items-start w-[100vw] overflow-x-hidden gap-[1rem]" 
    >
      <Navbar />
      <div
        className="positionFromtop w-full flex flex-col justify-center items-center gap-[3rem]"
      >
        <div
          className='blogPagePadding w-full flex flex-col gap-[3rem] justify-center items-start'
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl">{blog.title}</h1>
          <div className="text-justify text-lg md:text-lg">
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>
          
          <Link href='/#blog'>
            <button
              className='button border rounded-md text-black hover:bg-rose-100 transition'
            > 
              Back to homepage
            </button>
          </Link>

        </div>
        <Footer />
      </div>
    </div>


    // <div
    //   className='relative flex flex-col justify-center items-start w-[100vw] overflow-x-hidden'
    // >
    //   <Navbar />
    //   <div className="blogPagePadding w-full flex flex-col gap-[3rem] justify-center items-start">
    //     <h1 className="text-2xl md:text-3xl lg:text-5xl">{blog.title}</h1>
    //     <div className="text-justify text-lg md:text-lg">
    //       <ReactMarkdown>{blog.body}</ReactMarkdown>
    //     </div>
    //   </div>
    // </div>
  );
}
