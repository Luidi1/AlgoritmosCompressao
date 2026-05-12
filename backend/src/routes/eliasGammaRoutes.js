import express from "express";
import eliasGammaController from "../controllers/eliasGammaController.js";

const router = express.Router();

router.post("/encode", eliasGammaController.encode);
router.post("/decode", eliasGammaController.decode);

export default router;