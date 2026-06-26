// writerRoutes.js (assumed)
import express from "express";
import { addWriter, getWriters,deleteWriter,getWriterByName } from "../Controllers/WriterController.js";
import { uploadFiles } from "../config/cloudinary.js";

const router = express.Router();

// ➕ Add writer (with image)
router.post("/writers", uploadFiles.fields([
  { name: "writerImage", maxCount: 1 },
]), addWriter);

// 👥 Get all writers
router.get("/writers", getWriters);

// 👤 Get a single writer by ID
// router.get("/writers/:id", getWriterById);

// 🗑️ Delete a writer
router.delete("/writers/:id", deleteWriter);

// router.get("/books/by-writer/:writerName", getBooksByWriterName);

router.get("/writers/:name", getWriterByName);
export default router;
