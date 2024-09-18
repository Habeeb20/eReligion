import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Retrieve token from cookies

    if (!token) {
      // If no token found, send unauthorized error
      return next(createError(401, "Unauthorized: No token provided"));
    }

    // Verify token using JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // If token is invalid or expired, send forbidden error
        return next(createError(403, "Forbidden: Invalid token"));
      }

      req.user = user; // Attach decoded user data to request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    // Catch any unexpected errors and pass to error handler
    next(error);
  }
};
