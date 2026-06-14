// Import express
import express from "express";

// Import controllers
import {
  createEmergencyRequest,
  acceptEmergencyRequest,
  reserveEmergencyMedicine,
  getEmergencyRequests,
  completeEmergencyRequest,
  cancelEmergencyRequest,
} from "../controllers/emergencyController.js";


import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create router
const router = express.Router();




  // CREATE SOS REQUEST


router.post(
  "/create",
  authMiddleware,
  roleMiddleware("USER"),
  createEmergencyRequest
);



   //GET ALL SOS REQUESTS


router.get("/all",getEmergencyRequests);

router.put(
  "/accept/:id",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  acceptEmergencyRequest
);

router.put(
  "/reserve/:id",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  reserveEmergencyMedicine
);




router.put(
  "/complete/:id",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  completeEmergencyRequest
);



router.put(
  "/cancel/:id",
  authMiddleware,
  roleMiddleware("USER", "ADMIN"),
  cancelEmergencyRequest
);

// Export router
export default router;