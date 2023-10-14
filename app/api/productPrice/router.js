import express from "express";
import { getAllProductPrice, createProductPrice, editProductPrice, updateProductPrice, deleteProductPrice } from "./controller.js";

const router = express.Router();

const urlRouter = '/productPrice'
router.get(`${urlRouter}`, getAllProductPrice);
router.post(`${urlRouter}`, createProductPrice);
router.get(`${urlRouter}/masterProduct/:uuid`, editProductPrice);
router.put(`${urlRouter}/:product_price_id`, updateProductPrice);
router.delete(`${urlRouter}/:product_price_id/user/:userid`, deleteProductPrice);

export default router
