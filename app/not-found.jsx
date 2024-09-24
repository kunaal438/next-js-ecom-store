import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Ecommerce Store: Page not found",
}

const NotFound = () => {
    return (
        <div className="relative w-full min-h-cover flex items-center justify-center">
            <div className="flex flex-col justify-between gap-3 h-full py-12">
                <div className="mt-[1vh]">
                    <div className="w-[300px] sm:w-[450px] mx-auto">
                        <Image src="/assets/404.png" alt="Page not found image" width={500} height={500} className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-black-200 text-base text-center max-sm:px-10 mt-2">Seems like the page you are looking  does not exists. Head back to <Link href="/" className="text-black-300 underline hover:font-medium">store</Link> for shopping.</h1>
                </div>
                <div>
                    <Image src="/assets/logo.png" alt="logo" width={150} height={17} className="mx-auto" />

                    <p className="text-black-200 text-base mt-2 text-center">Best quality in fashion clothing store</p>
                </div>
            </div>
        </div>  
    )
}

export default NotFound;