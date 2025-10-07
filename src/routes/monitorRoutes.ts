import MonitorController from "../controllers/Monitor/MonitorController";
import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchemaMiddleware";

import * as schema from "../schemas/monitorSchema";


const router =  Router();

router.get("/", MonitorController.getAll);
router.get("/:id", validateSchema(schema.monitorGetByIdSchema, "params"), MonitorController.getById);
router.post("/", validateSchema(schema.monitorCreateSchema) , MonitorController.create);
router.put("/:id", validateSchema(schema.monitorUpdateIdSchema, "params"), validateSchema(schema.monitorUpdateSchema, "body") , MonitorController.update);
router.delete("/:id", validateSchema(schema.monitorDeleteSchema, "params"), MonitorController.delete);

export default router;