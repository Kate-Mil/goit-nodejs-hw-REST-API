import exp from "constants";
import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uinquePreffix = `${Date.now()}_${Math.random(Math.random() * 1e9)}`;
    const filename = `${uinquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 10 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extantion not allow"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  // fileFilter
});

export default upload;
