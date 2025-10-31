import InscricoesController from "../../controllers/Inscricoes/InscricoesController.js";
import { Router } from "express";

import { validateSchema } from "../../middlewares/validateSchemaMiddleware.js";
import * as schema from "../../schemas/inscricoesSchema.js";
import { authMiddleware, AuthRequest } from "../../middlewares/authMiddleware.js";


const router =  Router();

router.get("/", authMiddleware, InscricoesController.getAll);
router.get("/aluno", authMiddleware, InscricoesController.getInscricaoAluno); // lembra que essa rota é pra pegar as inscrições de um unico aluno ATRAVÉS DO TOKEN
router.get("/:id", authMiddleware ,validateSchema(schema.inscricoesGetByIdSchema, "params"), InscricoesController.getById);
router.post("/", authMiddleware ,validateSchema(schema.inscricoesCreateSchema) , InscricoesController.create);
router.delete("/:id", authMiddleware, validateSchema(schema.inscricoesDeleteSchema, "params"), InscricoesController.delete);

export default router;