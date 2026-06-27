import express from "express";
import { addBook, deleteBook, getBooks, getBookById } from "../Controllers/BookController.js";
import Book from "../Models/BookModel.js"; 
const router = express.Router();



import { uploadFiles } from "../config/cloudinary.js"; 

// add book
router.post("/books", (req, res, next) => {
  uploadFiles.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error("Multer/Cloudinary Error:", err); 
      return res.status(500).json({ message: "❌ ফাইল আপলোড ব্যর্থ: " + err.message });
    }
    next();
  });
}, addBook);


// 📚 Get all books
router.get("/books", getBooks);

// 🕒 GET /books/recent (Moved UP to avoid conflicting with /books/:id)
router.get('/books/recent', async (req, res) => {
  try {
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(6);
    res.json(recentBooks);
  } catch (error) {
    console.error("Recent books error:", error);
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
});

// 📖 Get single book by ID
router.get("/books/:id", getBookById);

// 🗑️ Delete book
router.delete("/books/:id", deleteBook);

// router.get("/books/download/:id", downloadBook);

export default router;