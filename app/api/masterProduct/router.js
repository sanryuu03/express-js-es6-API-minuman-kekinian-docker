import express from "express";
import multer from "multer";
import os from 'os'
import { getProduct, createProduct, updateProduct, deleteProduct} from "./controller.js";

const router = express.Router();

const picture_path = multer({ dest: os.tmpdir() }).single('image')

router.get('/masterProduct/user/:userid', getProduct);
router.post('/masterProduct', picture_path, createProduct);
router.put('/masterProduct/:master_product_id/user/:userid', picture_path, updateProduct);
router.delete('/masterProduct/:master_product_id/user/:userid', deleteProduct);

export default router
