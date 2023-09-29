import express from "express";
import multer from "multer";
import os from 'os'
import { getProduct, createProduct} from "./controller.js";

const router = express.Router();

const picture_path = multer({ dest: os.tmpdir() }).single('image')

router.get('/masterProduct/user/:userid', getProduct);
router.post('/masterProduct', picture_path, createProduct);

export default router
