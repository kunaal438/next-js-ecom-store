const ExtractFormData = (formEle) => {
    if(!formEle){ return { } }

    const form = new FormData(formEle);
    const formData = {};

    for(let [key, value] of form.entries()){
        formData[key] = value
    }

    return formData;
}

export default ExtractFormData;