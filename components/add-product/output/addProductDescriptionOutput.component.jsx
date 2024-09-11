import { useSelector } from "react-redux";

const AddProductDescriptionOutput = () => {

    const { details: { description, materialCare } } = useSelector(state => state.product);

    return (
        <div className="mt-7">
            
            <div>
                <h1 className="text-lg font-bold text-black-300 mb-6">Product Details</h1>
                {
                    description ?
                    <pre className="font-assistant line-clamp-10">{description}</pre> :
                    <div className="flex flex-col gap-2">
                        {
                            Array.from({ length: 5 }).map((_, i) => {
                                return <span key={i} className={`block w-[${100-(i*10)}%] h-[20px] bg-white-300/40 relative`}></span>
                            })
                        }
                    </div>
                }
            </div>

            <div className="mt-6">
                <h1 className="text-lg font-bold text-black-300 mb-6">Material & care</h1>
                {
                    materialCare ?
                    <pre className="font-assistant line-clamp-6">{materialCare}</pre> :
                    <div className="flex flex-col gap-2">
                        {
                            Array.from({ length: 3 }).map((_, i) => {
                                return <span key={i} className={`block w-[${80-(i*10)}%] h-[20px] bg-white-300/40 relative`}></span>
                            })
                        }
                    </div>
                }
            </div>

        </div>
    )
}

export default AddProductDescriptionOutput;