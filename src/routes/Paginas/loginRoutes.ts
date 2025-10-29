
import { Router } from "express";
import LoginController from "../../controllers/Login/LoginController.js";

const loginController = new LoginController();
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/login"); 
});
router.post("/", loginController.login);

export default router;
