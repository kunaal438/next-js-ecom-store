import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

const ProductSizeButton = ({size}) => {

    const { name, des } = size;

    const toolTipRef = useRef();
    const [tootTipPosition, setToolTipPosition] = useState("left");

    const handleTooltipPosition = () => {

        const toolTip = toolTipRef.current;

        if(toolTip){
            const boundingRect = toolTip.getBoundingClientRect();
            const isOverflowingRight = boundingRect.right > window.innerWidth;

            console.log(boundingRect.right , window.innerWidth)
            
            if (isOverflowingRight) {
                setToolTipPosition('right');
            } else {
                setToolTipPosition('left');
            } 
        }

    }
    
    useEffect(() => {

        handleTooltipPosition();

        window.addEventListener('resize', handleTooltipPosition);

        return () => window.removeEventListener('resize', handleTooltipPosition);

    }, [])
    
    return (
        <div className="group relative flex items-center justify-center w-14 h-14 bg-white-300/20 rounded-full border border-white-300 cursor-pointer">
            <p className="uppercase font-semibold text-lg">{name}</p>
            <div ref={toolTipRef} className={"p-4 border border-white-300 bg-white-100 absolute top-[120%] rounded-md min-w-[200px] shadow-xl shadow-black-100/10 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 duration-300 z-30 " + (tootTipPosition == "right" ? "right-0" : "left-0")}>
                <pre className="font-assistant text-black-100/60 capitalize">{des}</pre>
            </div>
        </div>
    )

}

const AddProductSizesOutput = () => {

    const { sizes } = useSelector(state => state.product);

    return (
        <div>
            <h1 className="uppercase font-semibold text-lg my-7">Select size</h1>

            <div className="w-full flex gap-3 flex-wrap items-center">
            {
                sizes.length ?
                sizes.map((size, i) => {
                    return <ProductSizeButton size={size} key={i} />
                })
                :
                Array.from({ length: 5 }).map((_, i) => {
                    return <div key={i} className="w-14 h-14 bg-white-300/20 rounded-full border border-white-300"></div>
                })
            }
            </div>

        </div>
    )
}

export default AddProductSizesOutput;