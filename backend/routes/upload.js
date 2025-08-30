// routes/upload.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    console.log('📁 Upload directory:', uploadDir);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('📁 Created upload directory');
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = 'image-' + uniqueSuffix + ext;
    console.log('📝 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('🔍 File filter check:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    if (file.mimetype.startsWith('image/')) {
      console.log('✅ File type accepted');
      cb(null, true);
    } else {
      console.log('❌ File type rejected');
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Upload endpoint - this creates /api/upload/upload when mounted at /api/upload
router.post('/upload', (req, res) => {
  console.log('🚀 Upload endpoint hit');
  console.log('📋 Request headers:', req.headers);
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Upload error:', err.message);
      
      if (err instanceof multer.MulterError) {
        console.error('❌ Multer error code:', err.code);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            error: 'File too large. Maximum size is 5MB.',
            code: 'FILE_TOO_LARGE' 
          });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ 
            error: 'Unexpected file field. Please use "image" field name.',
            code: 'UNEXPECTED_FIELD' 
          });
        }
      }
      
      return res.status(400).json({ 
        error: err.message,
        code: 'UPLOAD_ERROR' 
      });
    }

    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({ 
        error: 'No file uploaded. Please select an image file.',
        code: 'NO_FILE' 
      });
    }
    
    console.log('✅ File uploaded successfully:', {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    });
    
    // Return the relative URL path
    const imageUrl = `/uploads/${req.file.filename}`;
    
    const response = {
      success: true,
      url: imageUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    };
    
    console.log('📤 Sending response:', response);
    res.json(response);
  });
});

// Test endpoint to verify upload functionality
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Upload route is working',
    endpoint: '/api/upload',
    method: 'POST',
    field: 'image',
    maxSize: '5MB'
  });
});

export default router;