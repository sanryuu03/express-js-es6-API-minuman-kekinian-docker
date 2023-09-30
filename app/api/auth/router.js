import express from "express";
import { signIn } from "./controller.js";

const router = express.Router();

router.post('/signin', signIn);

export default router
