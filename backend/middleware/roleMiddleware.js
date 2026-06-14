
   //ROLE MIDDLEWARE


const roleMiddleware = (...allowedRoles) => {

  return (req, res, next) => {

    try {

      // Check role
      if (
        !allowedRoles.includes(
          req.user.role
        )
      ) {

        return res.status(403).json({

          message:
            "Access denied"

        });

      }

      next();

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

};



// Export middleware
export default roleMiddleware;