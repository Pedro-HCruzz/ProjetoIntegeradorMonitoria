// src/routes/alunoRoutes.ts
import { Router } from "express";
import AlunoController from "../controllers/Aluno/AlunoController";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";

import * as schema from "../schemas/alunoSchema";

const alunoController = new AlunoController();
const router = Router();

router.get("/", alunoController.getAll);
router.get("/:id", validateSchema(schema.alunoGetByIdSchema, "params"), alunoController.getById);
router.post("/", validateSchema(schema.alunoCreateSchema) , alunoController.create);
router.put("/:id", validateSchema(schema.alunoUpdateIdSchema, "params"), validateSchema(schema.alunoUpdateSchema, "body") , alunoController.update);
router.delete("/:id", validateSchema(schema.alunoDeleteSchema, "params"), alunoController.delete);

export default router;
