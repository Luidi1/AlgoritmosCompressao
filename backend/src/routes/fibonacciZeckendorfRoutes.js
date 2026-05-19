import express from "express";
import fibonacciZeckendorfController from "../controllers/fibonacciZeckendorfController.js";

const router = express.Router();

router.post("/encode", fibonacciZeckendorfController.encode);
router.post("/decode", fibonacciZeckendorfController.decode);

export default router;