import DisciplinaController from "../../controllers/Disciplina/DisiciplinaController";
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware";
import * as schema from "../../schemas/disciplinaSchema";
import { authMiddleware } from "../../middlewares/authMiddleware";


const router =  Router();

router.get("/",  authMiddleware, DisciplinaController.getAll);
router.get("/:id", authMiddleware, validateSchema(schema.disciplinaGetByIdSchema, "params"), DisciplinaController.getById);
router.post("/", authMiddleware, validateSchema(schema.disciplinaCreateSchema) , DisciplinaController.create);
router.put("/:id", authMiddleware, validateSchema(schema.disciplinaUpdateIdSchema, "params"), validateSchema(schema.disciplinaUpdateSchema, "body") , DisciplinaController.update);
router.delete("/:id", authMiddleware, validateSchema(schema.disciplinaDeleteSchema, "params"), DisciplinaController.delete);

export default router;