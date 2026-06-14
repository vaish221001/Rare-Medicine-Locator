// Import express
import express from "express";

// Import medicine controllers
import {
  addMedicine,
  getMedicines,
  searchMedicine,
  updateMedicineStock,
  deleteMedicine,
} from "../controllers/medicineController.js";


import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Create router
const router = express.Router();

// Add medicine
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  addMedicine
);

// Get all medicines
router.get("/all", getMedicines);

// Search medicine
router.get("/search", searchMedicine);
// update medicine stock
router.put(
  "/update-stock/:id",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  updateMedicineStock
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("PHARMACY", "ADMIN"),
  deleteMedicine
);

// Export router
export default router;