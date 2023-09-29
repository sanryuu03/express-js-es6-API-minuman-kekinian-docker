import express from "express";
import { getTransactions, createTransactions, updateTransactions, deleteTransactions } from "./controller.js";

const router = express.Router();

const urlRouter = '/transactions'
router.get(`${urlRouter}`, getTransactions);
router.post(`${urlRouter}`, createTransactions);
router.put(`${urlRouter}/:transactions_id`, updateTransactions);
router.delete(`${urlRouter}/:transactions_id`, deleteTransactions);

export default router
