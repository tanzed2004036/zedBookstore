import Writer from "../Models/WriterModel.js";
import Book from "../Models/BookModel.js"; 

//  Add new writer
export const addWriter = async (req, res) => {
  try {
    const { name, Enname, bio } = req.body;
    const imagePath = req.files?.writerImage?.[0]?.path ?? null; 

    const writer = new Writer({
      name,
      Enname,
      bio,
      image: imagePath,
    });

    await writer.save();
    res.status(201).json(writer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//  Get all writers
export const getWriters = async (req, res) => {
  try {
    const writers = await Writer.find();
    res.json(writers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//  Delete a writer
export const deleteWriter = async (req, res) => {
  try {
    const writer = await Writer.findById(req.params.id);
    if (!writer) return res.status(404).json({ message: "Writer not found" });

    // Cloudinary  image delete
    if (writer.image) {
      const parts = writer.image.split('/');
      const uploadIndex = parts.indexOf('upload');
      const fileParts = parts.slice(uploadIndex + 2).join('/');
      const publicId = fileParts.split('.').slice(0, -1).join('.');
      
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Writer.findByIdAndDelete(req.params.id);
    res.json({ message: "Writer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// writer name  details + book
export const getWriterByName = async (req, res) => {
  try {
    const name = req.params.name;

    const writer = await Writer.findOne({ name: name });
    if (!writer) return res.status(404).json({ message: "Writer not found" });


    const books = await Book.find({ writer: name });

    res.json({ 
      writer: writer,   
      books: books      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};