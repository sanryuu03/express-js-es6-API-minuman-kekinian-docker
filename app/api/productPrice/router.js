import express from "express";
import { getProductPrice, createProductPrice, updateProductPrice, deleteProductPrice } from "./controller.js";

const router = express.Router();

const urlRouter = '/productPrice'
router.get(`${urlRouter}/masterProduct/:master_product_id`, getProductPrice);
router.post(`${urlRouter}`, createProductPrice);
router.put(`${urlRouter}/:product_price_id/masterProduct/:master_product_id`, updateProductPrice);
router.delete(`${urlRouter}/:product_price_id/masterProduct/:master_product_id`, deleteProductPrice);

export default router
