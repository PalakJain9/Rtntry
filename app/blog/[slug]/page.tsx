import { blogs } from '@/data/blogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown
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

export async function generateMetadata(props: { params: Promise<BlogPageProps['params']> }): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return { title: blog.title };
}

export default async function BlogPage(props: { params: Promise<BlogPageProps['params']> }) {
  const params = await props.params;
  const slug = params.slug;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return notFound();
  }

  // Process the Markdown content with remark
  const processedContent = await remark()
    .use(remarkGfm)  // Enable GitHub Flavored Markdown (tables, task lists, etc.)
    .use(html)       // Convert to HTML
    .process(blog.body); // Process the Markdown content

  let htmlContent = processedContent.toString();  // Convert processed content to string

  // Manually replace newlines with <br /> tags to ensure they render correctly
  htmlContent = htmlContent.replace(/\n/g, '<br />');  // Replace newlines with <br />

  return (
    <div className="flex flex-col justify-center items-start w-[100vw] overflow-x-hidden gap-[1rem]">
      <Navbar />
      <div className="positionFromtop w-full flex flex-col justify-center items-center gap-[3rem]">
        <div className="blogPagePadding w-full flex flex-col gap-[3rem] justify-center items-start">
          <h1 className="text-2xl md:text-3xl lg:text-5xl">{blog.title}</h1>
          <div className="text-justify text-lg">
            {/* Inject processed HTML content */}
            <div
              className="prose whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: htmlContent }}  // Inject raw HTML with <br />
            />
          </div>

          <Link href='/#blog'>
            <button className="button border rounded-md text-black hover:bg-rose-100 transition-all">
              Back to homepage
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}


// import { blogs } from '@/data/blogs';
// import { notFound } from 'next/navigation';
// import { Metadata } from 'next';
// import Navbar from '@/app/navbar';
// import Footer from '@/app/footer';
// import Link from 'next/link';

// interface BlogPageProps {
//   params: {
//     slug: string;
//   };
// }

// export async function generateStaticParams() {
//   return blogs.map((blog) => ({ slug: blog.slug }));
// }

// export async function generateMetadata(props: { params: Promise<BlogPageProps['params']> }): Promise<Metadata> {
//   const params = await props.params;
//   const slug = params.slug;

//   const blog = blogs.find((b) => b.slug === slug);

//   if (!blog) {
//     return { title: 'Blog Not Found' };
//   }

//   return { title: blog.title };
// }

// export default async function BlogPage(props: { params: Promise<BlogPageProps['params']> }) {
//   const params = await props.params;
//   const slug = params.slug;

//   const blog = blogs.find((b) => b.slug === slug);

//   if (!blog) {
//     return notFound();
//   }

//   // Manually replace newline characters with <br /> tags to ensure line breaks
//   const processedContent = blog.body.replace(/\n/g, '<br />');  // Replace newlines with <br /> tags

//   return (
//     <div className="flex flex-col justify-center items-start w-[100vw] overflow-x-hidden gap-[1rem]">
//       <Navbar />
//       <div className="positionFromtop w-full flex flex-col justify-center items-center gap-[3rem]">
//         <div className="blogPagePadding w-full flex flex-col gap-[3rem] justify-center items-start">
//           <h1 className="text-2xl md:text-3xl lg:text-5xl">{blog.title}</h1>
//           <div className="text-justify text-lg md:text-lg leading-relaxed">
//             {/* Inject raw HTML content, ensuring <br /> is rendered correctly */}
//             <div
//               className="prose whitespace-pre-wrap leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: processedContent }}  // Directly inject HTML with <br />
//             />
//           </div>

//           <Link href='/#blog'>
//             <button className="button border rounded-md text-black hover:bg-rose-100 transition-all">
//               Back to homepage
//             </button>
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }
