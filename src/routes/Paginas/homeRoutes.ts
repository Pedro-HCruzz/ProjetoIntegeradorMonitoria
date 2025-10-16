import { Router } from "express";
import { authMiddleware, AuthRequest } from "../../middlewares/authMiddleware";
import { Response } from "express";

const router = Router();


router.get("/home", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ nome: req.user?.nome });
});


export default router

// a ideia de criar o userRoutes é para acessar rotas tipo /home, /profile, /settings