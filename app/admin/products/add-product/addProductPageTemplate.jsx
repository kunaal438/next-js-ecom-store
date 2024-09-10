const AddProductPageTemplate = ({ children }) => {

    const [formComponent, outputComponent] = children;

    return (
        <div className="flex items-center w-full h-[100vh]">
            {/* form */}
            <div className="relative w-[60%] h-full">
                {formComponent}
            </div>
            {/* output */}
            <div className="relative w-[40%] bg-white-200 h-full">
                {outputComponent}
            </div>
        </div>
    )
}

export default AddProductPageTemplate;