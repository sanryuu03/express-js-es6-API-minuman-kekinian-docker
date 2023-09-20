import express from "express";
import { getSize, createSize, updateSize, deleteSize } from "./controller.js";

const router = express.Router();

router.get('/size', getSize);
router.post('/size', createSize);
router.put('/size/:uuid', updateSize);
router.delete('/size/:uuid', deleteSize);

export default router
