import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddProductDetailsOutput from "./addProductDetailsOutput.component";
import Image from "next/image";

const AddProductImagesOutput = () => {

    const { images } = useSelector(state => state.product);
    const [view, setView] = useState("full");
    const [blockedByHeight, setBlockedByHeight] = useState(false);
    
    const handleWindowResize = () => {

        const height = window.innerHeight;
        const width = window.innerWidth;

        if(height <= 800 && width >= 1000){
            setBlockedByHeight(true);
        } else {
            setBlockedByHeight(false);
        }

    }

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }

    }, [])

    return (
        <>
        {blockedByHeight ?
        <p>You can view the preview on screen more than 500px</p>
        :
        <div className="relative max-sm:mb-20">

            {
                view == "full" ?
                <div className="w-full max-md:mt-6 max-xl:max-h-[700px] max-md:h-[500px] h-[80vh] mt-5 flex max-xl:overflow-x-auto xl:grid grid-cols-2 grid-rows-2 gap-3 md:px-5">
        
                    {
                        Array.from({ length: 4 }).map((_, i) => {
                            return (
                                <div key={i} className="relative max-md:flex-none max-xl:min-w-[300px] max-xl:w-[80%] w-full h-full bg-white-300/20 border  border-white-300">
                                    {
                                        images[i] &&
                                        <Image src={images[i]} width={300} height={500} alt="image" className="w-full h-full object-cover" />
                                    }
                                </div>
                            )
                        })
                    }
        
                </div> :
                <div className="w-full mt-6">
                    <AddProductDetailsOutput />
                </div>
            }

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-fit p-2 px-3 rounded-full flex items-center gap-2 bg-white-100 border border-white-300">
                <button className="w-[40px]" onClick={() => setView("full")}>Full</button>
                <button className="w-[40px]" onClick={() => setView("card")}>Card</button>
                <span className={"w-[55px] -z-10 h-[32px] rounded-full absolute top-1 bg-white-300/50 " + (view == "full" ? "left-1" : "right-1")}></span>
            </div>

        </div>}
        </>
    )
}

export default AddProductImagesOutput;