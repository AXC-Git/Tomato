// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'role', default: null },
  isActive: { type: Boolean, default: true },
  phoneNumber: { type: String },
  addresses: [{ 
    addressType: String,
    streetAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    isDefault: Boolean
  }],
  lastLogin: { type: Date }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;