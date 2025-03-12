// controllers/roleController.js
import roleModel from '../models/roleModel.js';

// Create new role
const createRole = async (req, res) => {
  try {
    const { name, permissions, description } = req.body;

    const existingRole = await roleModel.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'Role already exists' });
    }

    const role = new roleModel({
      name,
      permissions,
      description
    });

    await role.save();
        res.status(201).json({ success: true, message: 'Role created successfully', role });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create role' });
      }
    };

    export default { createRole };