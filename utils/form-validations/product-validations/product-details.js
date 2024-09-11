import { productCategories, productColors } from "../../productDetails";

const validateProductDetailsForm = (formData) => {

    let isValid = true;

    let { brand, title, stock, sellingPrice, actualPrice, category, color, tags} = formData;

    const maxBrandLength = 30;
    const maxTitleLength = 100;
    const maxTagsLimit = 10;

    let error = {};

    if(!brand.length){
        error.brand = "Provide clothing brand detail";
        isValid = false;
    }
    else if(brand.length > maxBrandLength){
        error.brand = `Brand Name must be under ${maxBrandLength} characters`;
        isValid = false;
    }

    if(!title.length){
        error.title = "Provide product title.";
        isValid = false;
    }
    else if (title.length > maxTitleLength){
        error.title = `Title must be under ${maxTitleLength} characters`;
        isValid = false;
    }

    if(!stock){
        error.stock = "Provide the product stock";
        isValid = false;
    }

    if(!sellingPrice){
        error.sellingPrice = "Provide selling price for this product";
        isValid = false;
    }

    if(!actualPrice){
        error.actualPrice = "Provide actual price of this product";
        isValid = false;
    }

    if(actualPrice < sellingPrice){
        error.sellingPrice = "Selling price is higher than actual price";
        isValid = false;
    }

    if(!category || !productCategories.includes(category)){
        error.category = "Please choose one of the categories from the select menu";
        isValid = false;
    }
    
    if(!color || !productColors.includes(color)){
        error.color = "Please choose product color from the options provided";
        isValid = false;
    }

    if(!tags.length){
        error.tags = "Add at least 1 tag to proceed";
        isValid = false;
    }
    else if (tags.length > maxTagsLimit){
        error.tags = `You can only add ${maxTagsLimit} tags`;
        isValid = false;
    }

    return { error, isValid };

}

export default validateProductDetailsForm;