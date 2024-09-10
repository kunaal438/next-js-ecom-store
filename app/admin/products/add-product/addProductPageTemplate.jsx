'use client'

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddProductPageTemplate = ({ children }) => {

    const [formComponent, outputComponent] = children;
    const pathname = usePathname();

    const formSteps = ["details", "description", "sizes", "images"];

    return (
        <div className="relative flex w-full min-h-[100vh]">
            {/* form */}
            <div className="relative w-[60%] h-full p-10 pr-16 pb-20">
                <div className="w-[80%] min-w-[500px] ml-auto h-full">
                    <Image src="/assets/logo.png" className="mb-12" width={150} height={20} alt="Logo" />

                    {/* route */}
                    <div className="flex items-center gap-2 my-8">
                        {
                            formSteps.map((step,i) => {
                                return (
                                    <div key={i} className="flex gap-1 items-center">
                                        <Link href={step} className={"capitalize hover:underline " + ( pathname.includes(step) ? " text-black-300 font-semibold " : " text-black-100 " )}>{step}</Link>
                                        {
                                            (i != formSteps.length - 1) && 
                                            <FontAwesomeIcon className="scale-[0.6] text-black-100" icon={faChevronRight} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    {formComponent}
                </div>
            </div>
            {/* output */}
            <div className="sticky top-0 right-0 w-[40%] bg-white-200 h-[100vh] px-10">
                <p className="mt-24 pt-2 text-black-100 mb-2">Preview</p>
                {outputComponent}
            </div>
        </div>
    )
}

export default AddProductPageTemplate;