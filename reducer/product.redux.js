import { reArrageArrayOrder } from "@/utils/sortingArray";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    title: "",
    brand: "",
    stock: null,
    price: {
        sellingPrice: null,
        actualPrice: null
    },
    category: null,
    color: null,
    tags: [],
    details: {
        description: "",
        materialCare: ""
    },
    sizes: [],
    images: [],
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

        setProductID: (state, action) => {
            return { ...state, id: action.payload }
        },

        setProductTitle: (state, action) => {
            return { ...state, title: action.payload }
        },

        setProductBrand: (state, action) => {
            return { ...state, brand: action.payload }
        },

        setProductStock: (state, action) => {
            return { ...state, stock: action.payload }
        },

        setProductSellingPrice: (state, action) => {
            return { ...state, price: { ...state.price, sellingPrice: action.payload } }
        },

        setProductActualPrice: (state, action) => {
            return { ...state, price: { ...state.price, actualPrice: action.payload } }
        },

        setProductCategory: (state, action) => {
            return { ...state, category: action.payload }
        },

        setProductColor: (state, action) => {
            return { ...state, color: action.payload }
        },

        addProductTags: (state, action) => {
            return { ...state, tags: [...state.tags, action.payload] }
        },

        removeProductTags: (state, action) => {
            
            let newTagsArray = [...state.tags];
            newTagsArray = state.tags.filter((_, i) => i != action.payload);

            return { ...state, tags: newTagsArray}
        },

        setProductDescription: (state, action) => {
            return { ...state, details: { ...state.details, description: action.payload } }
        },

        setProductMaterialCare: (state, action) => {
            return { ...state, details: { ...state.details, materialCare: action.payload } }
        },

        addProductSize: (state, action) => {
            return { ...state, sizes: [ ...state.sizes, action.payload ] }
        },

        updateProductSize: (state, action) => {

            const { index, size } = action.payload;

            let newSizes = [...state.sizes];

            newSizes[index] = size;

            return { ...state, sizes: newSizes }

        },

        removeProductSize: (state, action) => {
            let newSizeArray = [...state.sizes];
            newSizeArray = state.sizes.filter((_, i) => i != action.payload);

            return { ...state, sizes: newSizeArray}
        },

        reArrageProductSizeOrder: (state, action) => {
            const { index, type } = action.payload;

            const newSizesArray = reArrageArrayOrder({ index, type, array: state.sizes })

            return { ...state, sizes: newSizesArray }

        },
        
        addProductImage: (state, action) => {

            return { ...state, images: [...state.images, action.payload] }

        },

        removeProductImage: (state, action) => {

            let newImagesArray = [...state.images];
            newImagesArray = state.images.filter((_, i) => i != action.payload);

            return { ...state, images: newImagesArray}

        },

        reArrageProductImageOrder: (state, action) => {
            const { index, type } = action.payload;

            const newImagesArray = reArrageArrayOrder({ index, type, array: state.images })

            return { ...state, images: newImagesArray }

        }

    }
});

export const { setProductID, setProductTitle, setProductBrand, setProductStock, setProductSellingPrice, setProductActualPrice, setProductCategory, setProductColor, addProductTags, removeProductTags, setProductDescription, setProductMaterialCare, addProductSize, updateProductSize, removeProductSize, reArrageProductSizeOrder, addProductImage, removeProductImage, reArrageProductImageOrder } = productSlice.actions;

export default productSlice.reducer