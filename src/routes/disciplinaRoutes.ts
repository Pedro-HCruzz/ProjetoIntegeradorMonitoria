import DisciplinaController from "../controllers/Disciplina/DisiciplinaController";
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import * as schema from "../schemas/disciplinaSchema";


const router =  Router();

router.get("/", DisciplinaController.getAll);
router.get("/:id", validateSchema(schema.disciplinaGetByIdSchema, "params"), DisciplinaController.getById);
router.post("/", validateSchema(schema.disciplinaCreateSchema) , DisciplinaController.create);
router.put("/:id", validateSchema(schema.disciplinaUpdateIdSchema, "params"), validateSchema(schema.disciplinaUpdateSchema, "body") , DisciplinaController.update);
router.delete("/:id", validateSchema(schema.disciplinaDeleteSchema, "params"), DisciplinaController.delete);

export default router;