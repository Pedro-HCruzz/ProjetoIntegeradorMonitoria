import { Router } from "express";
import { authMiddleware, AuthRequest } from "../../middlewares/authMiddleware.js";
import { Response } from "express";

const router = Router();


router.get("/pages", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ nome: req.user?.nome });
});


export default router
