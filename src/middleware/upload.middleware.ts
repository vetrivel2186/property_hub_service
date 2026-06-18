import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    files:10,
    fileSize: 5 * 1024 * 1024,
  },
});

