'use client';

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SelectInput = ({ placeholder, name, displayError, value, inputClasses, options, onChange }) => {

    const [inputFocused, setInputFocus] = useState(value?.length ? true : false);
    
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
                
                <div className="relative">
                    <select 
                        onChange={onChange}
                        defaultValue={value}
                        className={" capitalize appearance-none w-full h-[50px] rounded-md border px-4 py-2 pt-4 bg-white-100 mb-2 " + inputClasses + (displayError ? " border-red-200  " : " border-white-200 ")} 
                        onFocus={addFocus} 
                        onBlur={removeFocus} 
                        name={name} 
                    >
                        
                        <option value=""></option>
                        {
                            options.map((option, i) => {
                                return <option key={i} className="capitalize" value={option}>{option}</option>
                            })
                        }
                        
                    </select>
                    <FontAwesomeIcon className="absolute right-3 top-1/2 w-4 h-4 text-black-100 scale-75 -translate-y-1/2 -mt-1" icon={faChevronDown} />
                </div>
                <p className={" pointer-events-none duration-500 absolute px-3 bg-white-100 left-1 " + ( inputFocused ? " -top-2.5 text-sm text-black-300 " : "top-3 text-black-100" ) }>{placeholder}</p>
                
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

export default SelectInput;