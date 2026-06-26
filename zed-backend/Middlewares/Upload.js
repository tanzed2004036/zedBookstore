// ✅ Upload.js
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/general";

    // Detect folder based on field name
    if (file.fieldname === "writerImage") {
      folder = "uploads/writers";
    } else if (file.fieldname === "image" || file.fieldname === "pdf") {
      folder = "uploads/books";
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
