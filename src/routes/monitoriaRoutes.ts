import MonitoriaController from "../controllers/Monitoria/MonitoriaController";
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import * as schema from "../schemas/monitoriaSchema";


const router =  Router();

router.get("/", MonitoriaController.getAll);
router.get("/:id", validateSchema(schema.monitoriaGetByIdSchema, "params"), MonitoriaController.getById);
router.post("/", validateSchema(schema.monitoriaCreateSchema) , MonitoriaController.create);
router.put("/:id", validateSchema(schema.monitoriaUpdateIdSchema, "params"), validateSchema(schema.monitoriaUpdateSchema, "body") , MonitoriaController.update);
router.delete("/:id", validateSchema(schema.monitoriaDeleteSchema, "params"), MonitoriaController.delete);

export default router;