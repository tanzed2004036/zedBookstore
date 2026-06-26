// routes/adminAuth.js
import express from "express";
import { createAdmin, loginAdmin } from "../Controllers/AdminController.js";

const router = express.Router();

router.post("/signup", createAdmin); // create new admin
router.post("/login", loginAdmin);   // admin login

export default router;
