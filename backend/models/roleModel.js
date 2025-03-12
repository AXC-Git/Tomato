// models/roleModel.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
  description: { type: String }
});

const roleModel = mongoose.models.role || mongoose.model("role", roleSchema);
export default roleModel;
