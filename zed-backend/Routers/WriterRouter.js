
import express from "express";
import { addWriter, getWriters,deleteWriter,getWriterByName } from "../Controllers/WriterController.js";
import { uploadFiles } from "../config/cloudinary.js";

const router = express.Router();

// Add writer 
router.post("/writers", uploadFiles.fields([
  { name: "writerImage", maxCount: 1 },
]), addWriter);

//  Get all writers
router.get("/writers", getWriters);


// router.get("/writers/:id", getWriterById);


router.delete("/writers/:id", deleteWriter);

// router.get("/books/by-writer/:writerName", getBooksByWriterName);

router.get("/writers/:name", getWriterByName);
export default router;
