import DisciplinaController from "../../controllers/Disciplina/DisiciplinaController.js";
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware.js";
import * as schema from "../../schemas/disciplinaSchema.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { autorizado } from "../../middlewares/authorizationMiddleware.js";

const router =  Router();

router.get("/", authMiddleware, autorizado(["ADMIN", "MONITOR"]), DisciplinaController.getAll);
router.get("/:id", authMiddleware, validateSchema(schema.disciplinaGetByIdSchema, "params"), DisciplinaController.getById);
router.post("/", authMiddleware, validateSchema(schema.disciplinaCreateSchema) , DisciplinaController.create);
router.put("/:id", authMiddleware, validateSchema(schema.disciplinaUpdateIdSchema, "params"), validateSchema(schema.disciplinaUpdateSchema, "body") , DisciplinaController.update);
router.delete("/:id", authMiddleware, validateSchema(schema.disciplinaDeleteSchema, "params"), DisciplinaController.delete);

export default router;