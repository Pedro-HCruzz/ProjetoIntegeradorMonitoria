
import { Router, Request, Response } from "express";
import LoginController from "../../controllers/Login/LoginController.js";

const loginController = new LoginController();
const router = Router();

// servir a página para não dar err no render
router.get("/", (req: Request, res: Response) => {
    res.sendFile("login.html", {root : "public"}) // olhar use no server
});


// processar o login
router.post("/", loginController.login);

export default router;
