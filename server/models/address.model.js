import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : Boolean,
        default : true
    },
    pincode : {
        type : String,
    },
    country : {
        type : String,        
    },
    mobile : {
        type : Number,
        default : null
    }

},{
    timestamps : true
})

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel