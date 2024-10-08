import Image from "next/image";

const Loader = () => {
    return (
        <div className={"w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-white-100/40 "}>
            <Image className=" select-none" src="/assets/loading.svg" width={80} height={80} priority alt="loading animation" />
        </div>
    )
}

export default Loader;