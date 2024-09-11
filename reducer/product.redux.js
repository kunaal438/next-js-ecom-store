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
            
            const newTagsArray = state.tags.filter((_, i) => i != action.payload);

            return { ...state, tags: newTagsArray}
        },

    }
});

export const { setProductID, setProductTitle, setProductBrand, setProductStock, setProductSellingPrice, setProductActualPrice, setProductCategory, setProductColor, addProductTags, removeProductTags } = productSlice.actions;

export default productSlice.reducer