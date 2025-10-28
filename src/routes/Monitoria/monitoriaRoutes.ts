import MonitoriaController from "../../controllers/Monitoria/MonitoriaController.js";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware.js";
import * as schema from "../../schemas/monitoriaSchema.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

import { Router } from "express";




const router =  Router();

router.get("/", authMiddleware , MonitoriaController.getAll);
router.get("/:id", authMiddleware, validateSchema(schema.monitoriaGetByIdSchema, "params"), MonitoriaController.getById);
router.post("/", authMiddleware, validateSchema(schema.monitoriaCreateSchema) , MonitoriaController.create);
router.put("/:id", authMiddleware ,validateSchema(schema.monitoriaUpdateIdSchema, "params"), validateSchema(schema.monitoriaUpdateSchema, "body") , MonitoriaController.update);
router.delete("/:id",  authMiddleware, validateSchema(schema.monitoriaDeleteSchema, "params"), MonitoriaController.delete);

export default router;