// src/routes/alunoRoutes.ts
import { Router } from "express";
import AlunoController from "../controllers/AlunoController/AlunoController";

const alunoController = new AlunoController();
const router = Router();

router.get("/", alunoController.getAll);
router.get("/:id", alunoController.getById);
router.post("/", alunoController.create);
router.put("/:id", alunoController.update);
router.delete("/:id", alunoController.delete);

export default router;
