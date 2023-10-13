import express from "express";
import { getSize, createSize, editSize, updateSize, deleteSize } from "./controller.js";

const router = express.Router();

router.get('/size', getSize);
router.post('/size', createSize);
router.get('/size/:uuid', editSize);
router.put('/size/:uuid', updateSize);
router.delete('/size/:uuid/user/:user_id', deleteSize);

export default router
