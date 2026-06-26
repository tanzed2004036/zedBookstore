import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    titleBn: {
      type: String,
      required: [true, "বইয়ের বাংলা নাম আবশ্যক"],
      trim: true, // Removes extra spaces from the beginning and end
    },
    titleEn: {
      type: String,
      required: [true, "বইয়ের ইংরেজি নাম আবশ্যক"],
      trim: true, 
    },
    writer: {
      type: String,
      required: [true, "লেখকের নাম আবশ্যক"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "ক্যাটাগরি আবশ্যক"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "ছবি আবশ্যক"], // Will store the Cloudinary image URL
    },
    details: {
      type: String,
      required: [true, "বিস্তারিত তথ্য আবশ্যক"],
    },
    pdf: {
      type: String,
      required: [true, "PDF ফাইল আবশ্যক"], // Will store the Cloudinary PDF URL
    },
  },
  {
    timestamps: true,
  }
);


const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;