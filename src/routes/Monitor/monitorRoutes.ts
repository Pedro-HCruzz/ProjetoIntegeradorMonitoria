import MonitorController from "../../controllers/Monitor/MonitorController";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware";
import * as schema from "../../schemas/monitorSchema";
import * as schemaAluno from "../../schemas/alunoSchema";
import { authMiddleware } from "../../middlewares/authMiddleware";

import { Router } from "express";


const router =  Router();

router.get("/", authMiddleware, MonitorController.getAll);
router.get("/:id", authMiddleware, validateSchema(schema.monitorGetByIdSchema, "params"), MonitorController.getById);
router.post("/", authMiddleware, validateSchema(schema.monitorCreateSchema) , MonitorController.create);
router.put("/:id", authMiddleware, validateSchema(schema.monitorUpdateIdSchema, "params"), validateSchema(schemaAluno.alunoUpdateSchema, "body") , MonitorController.update);
router.delete("/:id", authMiddleware, validateSchema(schema.monitorDeleteSchema, "params"), MonitorController.delete);

export default router;