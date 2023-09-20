import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./controller.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/user', createUser);
router.put('/user/:uuid', updateUser);
router.delete('/user', deleteUser);

export default router
