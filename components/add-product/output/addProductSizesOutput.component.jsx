import { useSelector } from "react-redux";

const AddProductSizesOutput = () => {

    const { sizes } = useSelector(state => state.product);

    return (
        <div>
            <h1 className="uppercase font-semibold text-lg my-7">Select size</h1>

            <div className="w-full flex gap-3 flex-wrap items-center">
            {
                sizes.length ?
                sizes.map((size, i) => {

                    const { name, des } = size;

                    return (
                        <div key={i} className="group relative flex items-center justify-center w-14 h-14 bg-white-300/20 rounded-full border border-white-300 cursor-pointer">
                            <p className="uppercase font-semibold text-lg">{name}</p>
                            <div className="p-4 border border-white-300 bg-white-100 absolute top-[120%] left-0 rounded-md min-w-[200px] shadow-xl shadow-black-100/10 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 duration-300">
                                <pre className="font-assistant text-black-100/60 capitalize">{des}</pre>
                            </div>
                        </div>
                    )
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