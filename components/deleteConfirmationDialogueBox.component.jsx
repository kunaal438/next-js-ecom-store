const DeleteConfirmation = ({ children, cancelFunc, deleteFunc }) => {

    return (
        <div className="z-50 fixed top-0 left-0 w-full h-screen bg-black-100/10 flex items-center justify-center">
            <div className="p-7 rounded-xl px-8 relative bg-white-100 border border-white-300">
                <h1 className="font-bold text-lg mb-2">Are you sure ??</h1>

                <p className="my-3">Do you want to delete : </p>
                <div className="p-3 bg-white-200/50">
                    {children}
                </div>

                <div className="flex justify-end gap-2 mt-5">
                    <button className="primary_btn !px-5 !rounded-md !bg-white-200 !text-black-300" onClick={cancelFunc}>Cancel</button>
                    <button className="primary_btn !px-5 !rounded-md !bg-red-300 !text-white-100" 
                        onClick={deleteFunc}
                    >Yes, Delete it</button>
                </div>
            </div>
        </div>
    )

}

export default DeleteConfirmation;