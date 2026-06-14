// Import JWT
import jwt from "jsonwebtoken";




  // AUTH MIDDLEWARE


const authMiddleware = (req, res, next) => {

  try {

    // Get token from request headers
    const token =
      req.header("Authorization");



    // If token not found
    if (!token) {

      return res.status(401).json({

        message:
          "Access denied. No token provided."

      });

    }



    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );



    // Save user data in request
    req.user = decoded;



    // Move to next function
    next();

  }

  catch (error) {

    res.status(401).json({

      message:
        "Invalid token"

    });

  }

};



// Export middleware
export default authMiddleware;