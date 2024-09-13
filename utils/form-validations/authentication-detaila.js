import { emailRegex, passwordRegex } from "../regex";

const validateAuthenticationData = (formData) => {
        
    let isValid = true;
    const error = {};

    const { fullname, email, password } = formData;

    if(fullname != undefined && !fullname.length){
        error.fullname = "Fullname is required"
        isValid = false;
    }

    if(!email.length){
        error.email = "Email is required"
        isValid = false;
    } else if(!emailRegex.test(email)){
        error.email = "Email is invalid. Please provide a valid email"
        isValid = false;
    }

    if(!passwordRegex.test(password)){
        error.password = "Password should contain 1 uppercase letter, 1 number and should be at least 8 characters long"
        isValid = false;
    }

    return { isValid, error };        
    
}

export default validateAuthenticationData;