import mongoose from "mongoose";

const bookRequestSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  author: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model("BookRequest", bookRequestSchema);

export default Request;
