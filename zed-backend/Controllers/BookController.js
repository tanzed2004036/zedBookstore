import Book from "../Models/BookModel.js";
import { cloudinary } from "../config/cloudinary.js";  

// 📚 Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); 
    res.json(books);
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

// 📚 Add a new book
export const addBook = async (req, res) => {
  try {
    const { titleBn, titleEn, writer, category, details } = req.body;

    // multer-storage-cloudinary automatically uploads files and puts the Cloudinary URL in .path
    const image = req.files?.image?.[0]?.path;
    const pdf = req.files?.pdf?.[0]?.path;

    if (!titleBn || !titleEn || !writer || !category || !details || !image || !pdf) {
      return res.status(400).json({ message: "সব ফিল্ড অবশ্যই পূরণ করতে হবে।" });
    }

    const newBook = new Book({
      titleBn,
      titleEn,
      writer,
      category,
      details,
      image, // Cloudinary Secure URL
      pdf,   // Cloudinary Secure URL
    });

    const saved = await newBook.save();
    res.status(201).json({ message: "✅ বই যোগ করা হয়েছে", book: saved });
  } catch (err) {
    console.error(err);
    // Handling MongoDB Duplicate Key Error (e.g., if title already exists)
    if (err.code === 11000) {
      return res.status(400).json({ message: "❌ এই নামের বই ইতিমধ্যে ডাটাবেজে রয়েছে।" });
    }
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

// Helper function to extract Public ID from Cloudinary URL
// Cloudinary URL looks like: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/filename.jpg
// We need: "folder/filename" to delete it
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Join all parts after 'vXXXXX' (version tag)
    const fileParts = parts.slice(uploadIndex + 2).join('/');
    // Remove the file extension (.jpg, .pdf etc)
    return fileParts.split('.').slice(0, -1).join('.');
  } catch (error) {
    return null;
  }
};

// 🗑️ Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "বই পাওয়া যায়নি" });
    }

    // 1️⃣ Delete Image from Cloudinary
    if (book.image) {
      const imagePublicId = getPublicIdFromUrl(book.image);
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId); // Deletes image
      }
    }

    // 2️⃣ Delete PDF from Cloudinary
    if (book.pdf) {
      const pdfPublicId = getPublicIdFromUrl(book.pdf);
      if (pdfPublicId) {
        // Since PDF is uploaded as 'raw' file, we must specify resource_type: 'raw'
        await cloudinary.uploader.destroy(pdfPublicId, { resource_type: 'raw' }); 
      }
    }

    // 3️⃣ Delete Book Document from MongoDB
    await Book.findByIdAndDelete(id);
    res.json({ message: "🗑️ বই এবং ক্লাউডিনারি থেকে ফাইল মুছে ফেলা হয়েছে" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

// 🔍 Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "বই পাওয়া যায়নি" });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "সার্ভার ত্রুটি" });
  }
};


// // ⬇️ Download a book PDF
// export const downloadBook = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: "বই পাওয়া যায়নি" });
//     }

//     // Cloudinary থেকে PDF Fetch করা
//     const response = await fetch(book.pdf);

//     if (!response.ok) {
//       return res
//         .status(500)
//         .json({ message: "PDF ডাউনলোড করা যায়নি" });
//     }

//     const buffer = await response.arrayBuffer();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${encodeURIComponent(book.titleBn)}.pdf"`
//     );

//     res.send(Buffer.from(buffer));
//   } catch (err) {
//     console.error("Download Error:", err);
//     res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
//   }
// };