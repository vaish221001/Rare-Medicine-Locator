//import express
import express from 'express';
//import register controller
import {register,Login} from '../controllers/authController.js';
//create router
const router = express.Router();
//register api route
router.post("/register",register);
//login api route
router.post("/Login",Login);
//export router
export default router;