import express from "express";
import { cartController } from "../controllers/cart";

const router = express.Router();

router.get("/carts", cartController )

export default router;
