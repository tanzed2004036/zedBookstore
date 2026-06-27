import Request from "../Models/BookRequest.js";

export const createBookRequest = async (req, res) => {
  try {
    const { bookTitle, author, message } = req.body;
    const newRequest = new Request({ bookTitle, author, message });
    await newRequest.save();
    res.status(201).json({ message: "Book request submitted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit request" });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};
// Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params; 
    const deleted = await Request.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Request deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};
