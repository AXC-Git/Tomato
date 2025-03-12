// middleware/roleAuth.js
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import roleModel from '../models/roleModel.js';

const roleMiddleware = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, login required' });
      }

      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(tokenData.id).populate('role');
      
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      
      if (!user.isActive) {
        return res.status(403).json({ success: false, message: 'Account is inactive' });
      }
      
      if (!user.role || !Array.isArray(requiredPermissions)) {
        return res.status(403).json({ success: false, message: 'Insufficient permissions' });
      }
      
      const hasAllPermissions = requiredPermissions.every(permission => 
        user.role.permissions.includes(permission)
      );
      
      if (!hasAllPermissions) {
        return res.status(403).json({ success: false, message: 'Insufficient permissions' });
      }
      
      // Update user data for the request
      req.user = {
        id: user._id,
        role: user.role.name,
        permissions: user.role.permissions
      };
      
      next();
    } catch (error) {
      console.error("Role middleware error:", error);
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  };
};

export default roleMiddleware;