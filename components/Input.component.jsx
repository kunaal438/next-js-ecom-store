'use client';

import { useState } from "react";

const InputField = ({ type, placeholder, name, displayError }) => {

    const [inputFocused, setInputFocus] = useState(false);
    
    const addFocus = () => {
        setInputFocus(true)
    }

    const removeFocus = (e) => {
        if(!e.target.value.length){
            setInputFocus(false);
        }
    }
    
    return (
        <div className="w-full">
            <div className="relative">
                
                <input className={"w-full h-[50px] rounded-md border px-4 py-3 pt-4 bg-white-100 mb-2" + (displayError ? " border-red-200  " : " border-white-200 ")} onFocus={addFocus} onBlur={removeFocus} type={type} name={name} />
                <p className={" pointer-events-none duration-500 absolute px-3 bg-white-100 left-1 " + ( inputFocused ? " -top-2.5 text-sm " : "top-3" ) }>{placeholder}</p>
                
                {
                    displayError && 
                    <div className="w-full">
                        <span className=" block break-words text-red-300 pb-2 ">* {displayError}</span>
                    </div>
                }

            </div>
        </div>
    )
}

export default InputField;