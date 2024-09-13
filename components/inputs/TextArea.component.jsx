import { useState } from "react";

const TextArea = ({ refVal, placeholder, name, displayError, max, onChange, value, inputClasses, onKeyDown, onBlur, errorStyles, height }) => {

    const [inputFocused, setInputFocus] = useState(value?.length ? true : false);
    
    const addFocus = () => { setInputFocus(true) }

    const removeFocus = (e) => { (!e.target.value.length) && setInputFocus(false) }

    const handleBlur = (e) => {
        removeFocus(e);
        onBlur && onBlur();
    }

    const handleChange = (e) => {

        const textarea = e.target;
        const rows = Number(textarea.getAttribute("rows"));
        const clientHeight = textarea.clientHeight;
        const scrollHeight = textarea.scrollHeight;

        if(scrollHeight > clientHeight){
            textarea.setAttribute("rows", rows + 1);
        }

        onChange && onChange(e); // run onChange evert if any

    }

    return (
        <div className="w-full">
            <div className="relative">
                
                <textarea 
                    ref={refVal}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    defaultValue={value}
                    maxLength={max}
                    className={" resize-none w-full rounded-md border px-4 py-3 pt-4 bg-white-100 mb-2 " + inputClasses + (displayError ? " border-red-200  " : " border-white-200 ")} 
                    onFocus={addFocus} 
                    onBlur={handleBlur} 
                    name={name} 
                    rows={height || 4}
                >
                </textarea>
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

export default TextArea;