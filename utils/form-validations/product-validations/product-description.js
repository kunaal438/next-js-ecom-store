const validateProductDescriptionForm = (formdata) => {

    let isValid = true;
    const { description, materialCare } = formdata;

    const maxDescriptionLength = 2000;
    const maxMaterialCareLength = 1000;

    let error = {};

    if(!description.length){
        error.description = "Provide Product description to proceed.";
        isValid = false;
    } 
    else if(description.length > maxDescriptionLength) {
        error.description = `Description shoule be under ${maxDescriptionLength} characters`;
        isValid = false;
    }

    if(!materialCare.length){
        error.materialCare = "Provide material info and care instructions of the product.";
        isValid = false;
    }
    else if(materialCare.length > maxMaterialCareLength){
        error.materialCare = `Material and care info should be under ${maxMaterialCareLength} characters`;
        isValid = false;
    }

    return { isValid, error }

}

export default validateProductDescriptionForm;