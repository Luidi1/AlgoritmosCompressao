import express from "express";
import golombController from "../controllers/golombController.js";

const router = express.Router();

router.post("/encode", golombController.encode);
router.post("/decode", golombController.decode);

export default router;