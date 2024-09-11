'use client';

import { useState } from "react";

const InputField = ({ refVal, type, disable, placeholder, name, displayError, max, onChange, value, inputClasses, onKeyDown, onBlur, errorStyles }) => {

    const [inputFocused, setInputFocus] = useState(value?.length ? true : false);
    
    const addFocus = () => {
        setInputFocus(true)
    }

    const removeFocus = (e) => {
        if(!e.target.value.length){
            setInputFocus(false);
        }
    }

    const handleBlur = (e) => {
        removeFocus(e);
        onBlur && onBlur(e);
    }

    const preventNumArrowKeysFromFunction = (e) => {
        if(e.key == "ArrowUp" || e.key == "ArrowDown"){
            e.preventDefault();
        }
    }

    const handleKeyDown = (e) => {

        if(type == "number"){
            preventNumArrowKeysFromFunction(e);
        }

        onKeyDown && onKeyDown(e);
    }

    return (
        <div className="w-full">
            <div className="relative">
                
                <input 
                    ref={refVal}
                    disabled={disable}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    defaultValue={value}
                    maxLength={max}
                    className={"w-full h-[50px] rounded-md border px-4 py-3 pt-4 bg-white-100 mb-2 " + inputClasses + (displayError ? " border-red-200  " : " border-white-200 ")} 
                    onFocus={addFocus} 
                    onBlur={handleBlur} 
                    type={type} 
                    name={name} 
                />
                <p className={" pointer-events-none duration-500 absolute px-3 bg-white-100 left-1 " + ( inputFocused ? " -top-2.5 text-sm text-black-300 " : "top-3 text-black-100" ) }>{placeholder}</p>
                
                {
                    displayError && 
                    <div className={"w-full " + errorStyles}>
                        <span className=" block break-words text-red-300 pb-2 ">* {displayError}</span>
                    </div>
                }

            </div>
        </div>
    )
}

export default InputField;