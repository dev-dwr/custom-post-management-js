import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    
    email: {type: String, required: true},
    
    password: {type: String, required: true},
    
    id: {type: String},
    
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending"
    },

    confirmationCode: {
        type: String,
        unique: true
    }
});

export default mongoose.model("User", userSchema);