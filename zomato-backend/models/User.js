const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true }, // Added 'trim: true' removes leading/trailing spaces to prevent accidental whitespace errors
    email: { 
        type: String, 
        required: true, 
        unique: true,         // Added 'unique: true' to prevent duplicate emails
        trim: true, 
        match: /.+\@.+\..+/  // Ensures valid email format
    },  
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Optional: Role-based access
}, { timestamps: true });  // Adds createdAt & updatedAt fields
// Fixed all 'require' to 'required'


module.exports=mongoose.model('User',UserSchema);