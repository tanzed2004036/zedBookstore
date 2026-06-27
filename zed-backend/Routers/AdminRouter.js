
import express from "express";
import { createAdmin, loginAdmin } from "../Controllers/AdminController.js";

const router = express.Router();

router.post("/signup", createAdmin); 
router.post("/login", loginAdmin);   

export default router;
