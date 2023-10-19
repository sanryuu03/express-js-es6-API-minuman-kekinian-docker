import express from "express";
import { getShopProduct, getShopProductPrice, postShopAddToCart } from "./controller.js";

const router = express.Router();

const urlRouter = '/shop'
router.get(`${urlRouter}/masterProduct/:master_product_id/user/:user_id`, getShopProduct);
router.get(`${urlRouter}/masterProduct/:master_product_id/size/:size_id/promo/:status_promo`, getShopProductPrice);
router.post(`${urlRouter}/addToCart`, postShopAddToCart);

export default router
