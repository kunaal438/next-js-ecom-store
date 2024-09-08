import { emailRegex, passwordRegex } from "../regex.js";

const validateAuthForm = (formData) => {

    let form = { valid: true, error: "" };

    const { fullname, email, password } = formData;

    if(fullname != undefined && !fullname.length){
        form = { valid: false, error: "Name is required", field: "fullname" }
    } 
    else if(!email.length){
        form = { valid: false, error: "Email is required", field: "email" }
    } 
    else if(!emailRegex.test(email)){
        form = { valid: false, error: "Email is invalid. Please provide a valid email", field: "email" }
    }
    else if(!passwordRegex.test(password)){
        form = { valid: false, error: "Password should contain 1 uppercase letter, 1 number and should be at least 8 characters long", field: "password" }
    }

    return form;

}

export default validateAuthForm;