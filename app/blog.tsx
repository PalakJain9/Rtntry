import '../app/globals.css'; 
import Image from "next/image";

const Blog = () => {
    return (
        <div
            className='flex flex-col items-center w-[100vw] h-full universalPadding gap-[3rem]'
        >
            <h1 className='text-6xl'>
                The blogs every IT GIRL reads to level up.
            </h1>

            <div
                className='flex flex-row flex-wrap gap-[2rem] justify-center items-center w-5/6'
            >
                {/* blog pallet collection */}
                
                {/* pallet 1 */}
                <div className='flex flex-col justify-center items-center w-1/3 gap-[1rem] overflow-hidden bg-rose-200'>
                    <Image
                        src="/logo.svg" // Relative to the public/ directory
                        alt="Are you journaling all wrong when you feel low?"
                        width={200}
                        height={200}
                        priority // Optional: loads image immediately
                        style={{ objectFit: "contain" }}
                    />
                    <p className='text-3xl'> Are you journaling all wrong when you feel low?</p>
                </div>
                {/* pallet 1 ends */}

                {/* pallet 2 */}
                <div className='flex flex-col justify-center items-center w-1/3 gap-[1rem] overflow-hidden bg-rose-200'>
                    <Image
                        src="/logo.svg" // Relative to the public/ directory
                        alt="Are you journaling all wrong when you feel low?"
                        width={200}
                        height={200}
                        priority // Optional: loads image immediately
                        style={{ objectFit: "contain" }}
                    />
                    <p className='text-3xl'> Are you journaling all wrong when you feel low?</p>
                </div>
                {/* pallet 2 ends */}

                {/* pallet 3 */}
                <div className='flex flex-col justify-center items-center w-1/3 gap-[1rem] overflow-hidden bg-rose-200'>
                    <Image
                        src="/logo.svg" // Relative to the public/ directory
                        alt="Are you journaling all wrong when you feel low?"
                        width={200}
                        height={200}
                        priority // Optional: loads image immediately
                        style={{ objectFit: "contain" }}
                    />
                    <p className='text-3xl'> Are you journaling all wrong when you feel low?</p>
                </div>
                {/* pallet 3 ends */}

                {/* pallet collection ends */}
            </div>
        </div>
    )
}

export default Blog