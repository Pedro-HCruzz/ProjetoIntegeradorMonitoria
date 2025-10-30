// loginRoutes.ts
import { Router, Request, Response } from "express";
import LoginController from "../../controllers/Login/LoginController.js";

import path from "path";
import { fileURLToPath } from "url";

const loginController = new LoginController();
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// GET /login -> serve a página de login
router.get("/", (req: Request, res: Response) => {
    res.sendFile("login.html", {root : "public"}) // olhar use no server
});


// POST /login -> processa o login
router.post("/", loginController.login);

export default router;
