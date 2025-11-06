import MonitorController from "../../controllers/Monitor/MonitorController.js";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware.js";
import * as schema from "../../schemas/monitorSchema.js";
import * as schemaAluno from "../../schemas/alunoSchema.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { autorizado } from "../../middlewares/authorizationMiddleware.js";

import { Router } from "express";


const router =  Router();

router.get("/", authMiddleware, MonitorController.getAll);
router.get("/:id", authMiddleware, autorizado(["ADMIN"]), validateSchema(schema.monitorGetByIdSchema, "params"), MonitorController.getById);

router.post("/", authMiddleware, autorizado(["ADMIN"]),validateSchema(schema.monitorCreateSchema) , MonitorController.create);

router.put("/:id", authMiddleware,  autorizado(["ADMIN"]), validateSchema(schema.monitorUpdateIdSchema, "params"), validateSchema(schemaAluno.alunoUpdateSchema, "body") , MonitorController.update);
router.delete("/:id", authMiddleware,  autorizado(["ADMIN"]), validateSchema(schema.monitorDeleteSchema, "params"), MonitorController.delete);

export default router;