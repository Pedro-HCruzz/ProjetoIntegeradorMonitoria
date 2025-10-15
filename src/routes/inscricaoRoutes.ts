import InscricoesController from "../controllers/Inscricoes/InscricoesController";
import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import * as schema from "../schemas/inscricoesSchema";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";


const router =  Router();

router.get("/", authMiddleware, InscricoesController.getAll);
router.get("/aluno", authMiddleware, InscricoesController.getInscricaoAluno);
router.get("/:id", validateSchema(schema.inscricoesGetByIdSchema, "params"), InscricoesController.getById);
router.post("/", validateSchema(schema.inscricoesCreateSchema) , InscricoesController.create);
router.delete("/:id", authMiddleware, validateSchema(schema.inscricoesDeleteSchema, "params"), InscricoesController.delete);

export default router;