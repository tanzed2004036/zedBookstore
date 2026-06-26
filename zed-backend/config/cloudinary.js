import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Single storage that handles both image and PDF based on fieldname
const combinedStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    
    if (file.fieldname === 'pdf') {
      return {
        folder: 'zedbookstore/ebooks',
        resource_type: 'raw',
        
      };
    } 
    
    else if (file.fieldname === 'image') {
      return {
        folder: 'zedbookstore/covers',        
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      };
    } 
    
    else if (file.fieldname === 'writerImage') {
      return {
        folder: 'zedbookstore/writers',       
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      };
    }

    else {
      return {
        folder: 'zedbookstore/general',
      };
    }
  },
});

export const uploadFiles = multer({ storage: combinedStorage });
export { cloudinary };
