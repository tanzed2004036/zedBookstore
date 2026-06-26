import express from "express";
const router = express.Router();
import {createBookRequest,getAllRequests,deleteRequest} from "../Controllers/BookRequestController.js"

router.post("/requests",createBookRequest);
router.get("/requests",getAllRequests); // optional: for admin panel
router.delete("/requests/:id", deleteRequest);
export default router;
