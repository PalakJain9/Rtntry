'use client';
import Link from 'next/link';
import '../app/globals.css'; 
import Image from "next/image";
import { blogs } from '@/data/blogs';

const BlogPallet = () => {
    return (
        <section
            id='blog'
            className='flex flex-col items-center w-[100vw] h-full universalPadding gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem]'
        >
            <h1 className='text-xl md:text-2xl lg:text-6xl'>
                The blogs every IT GIRL reads to level up.
            </h1>

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
                                src={blog.image} // Relative to the public/ directory
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


                {/* pallet 3 */}
                {/* <div className='flex flex-col justify-center items-center w-1/3 gap-[1rem] overflow-hidden bg-rose-200'>
                    <Image
                        src="/logo.svg" // Relative to the public/ directory
                        alt="Are you journaling all wrong when you feel low?"
                        width={200}
                        height={200}
                        priority // Optional: loads image immediately
                        style={{ objectFit: "contain" }}
                    />
                    <p className='text-3xl'> Are you journaling all wrong when you feel low?</p>
                </div> */}
                {/* pallet 3 ends */}

                {/* pallet collection ends */}
            </div>
        </section>
    )
}

export default BlogPallet