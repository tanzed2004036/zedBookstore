import Book from "../Models/BookModel.js";
import { cloudinary } from "../config/cloudinary.js";  

//  Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); 
    res.json(books);
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

//  Add  new book
export const addBook = async (req, res) => {
  try {
    const { titleBn, titleEn, writer, category, details } = req.body;

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
      image, 
      pdf,   
    });

    const saved = await newBook.save();
    res.status(201).json({ message: "✅ বই যোগ করা হয়েছে", book: saved });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "❌ এই নামের বই ইতিমধ্যে ডাটাবেজে রয়েছে।" });
    }
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

// Helper function to extract Public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    const fileParts = parts.slice(uploadIndex + 2).join('/');
    return fileParts.split('.').slice(0, -1).join('.');
  } catch (error) {
    return null;
  }
};

//  Delete a book 
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "বই পাওয়া যায়নি" });
    }

    //  Delete Image from Cloudinary
    if (book.image) {
      const imagePublicId = getPublicIdFromUrl(book.image);
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId); 
      }
    }

    //  Delete PDF from Cloudinary
    if (book.pdf) {
      const pdfPublicId = getPublicIdFromUrl(book.pdf);
      if (pdfPublicId) {
        await cloudinary.uploader.destroy(pdfPublicId, { resource_type: 'raw' }); 
      }
    }

    //  Delete Book  from MongoDB
    await Book.findByIdAndDelete(id);
    res.json({ message: "🗑️ বই এবং ক্লাউডিনারি থেকে ফাইল মুছে ফেলা হয়েছে" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "❌ সার্ভার ত্রুটি" });
  }
};

//  Get a single book 
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


// //  Download a book PDF
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