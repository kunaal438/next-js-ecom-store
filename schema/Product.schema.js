import { productCategories, productColors } from "@/utils/productDetails.js";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({

    product_id: {
        type: String,
        required: [true, "Can't create product without it's id"]
    },
    title: {
        type: String,
        required: [true, "Need product title to proceed"],
    },
    brand: {
        type: String,
        required: [true, "Brand details needed"]
    },
    stock: {
        type: Number,
        required: [true, "Need product stocks"],
        min: [1, "Provide product stocks detail"]
    },
    price: {
        sellingPrice: {
            type: Number,
            required: [true, "Provide the selling price for the product"],
        },
        actualPrice: {
            type: Number,
            required: [true, "Provide the actual price of the product"]
        }
    },
    category: {
        type: String,
        required: [true, "Select product category from the options provided"],
        enum: {
            values: productCategories,
            message: "{Value} is not a valid category"
        }
    },
    color: {
        type: String,
        required: [true, "Provide product color"],
        enum: {
            values: productColors,
            message: "{Value} is not a valid color"
        }
    },
    tags: {
        type: [String],
        required: [true, "Provide tags to add product"],
        validate: {
            validator: (v) => {
              v.length > 0 ? true : "Need at least 1 tag to add the product"
            }
        },
    },
    details: {
        description: String,
        materialCare: String
    }

})

const Product = models.Product || model('Product', ProductSchema);

export default Product;