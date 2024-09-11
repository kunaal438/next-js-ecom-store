const validateProductSizes = (formData) => {

    const { name, des, stock } = formData;

    let isValid = true;
    let errors = {};

    const maxSizeNameLength = 5;
    const maxSizeDesLength = 50;

    if(!name.length){
        errors.size = "Provide the size name"
        isValid = false;
    } else if(name.length > maxSizeNameLength){
        errors.size = `Size name should be under ${maxSizeNameLength} characters`
        isValid = false;
    }

    if(!des.length){
        errors.sizeDes = "Provide side description to tell more about it, like length, width, height"
        isValid = false;
    } else if(des.length > maxSizeDesLength){
        errors.sizeDes = `Size description should be under ${maxSizeDesLength} characters`;
        isValid = false;
    }

    if(!stock || stock <= 0){
        errors.stock = "Provide product stock details",
        isValid = false;
    }

    if(!isValid){
        return { isValid, errors }
    }

    return { isValid, info: { name: name.trim().toLowerCase(), des, stock } }
}

export default validateProductSizes;