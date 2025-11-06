import MonitoriaController from "../../controllers/Monitoria/MonitoriaController.js";
import { validateSchema } from "../../middlewares/validateSchemaMiddleware.js";
import * as schema from "../../schemas/monitoriaSchema.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { autorizado } from "../../middlewares/authorizationMiddleware.js";

import { Router } from "express";
import { Perfil } from "@prisma/client";



const router =  Router();

router.get("/", authMiddleware , MonitoriaController.getAll);
router.get("/:id", authMiddleware, validateSchema(schema.monitoriaGetByIdSchema, "params"), MonitoriaController.getById);

router.post("/", authMiddleware, autorizado(["ADMIN"]), validateSchema(schema.monitoriaCreateSchema) , MonitoriaController.create); //adicionar aqui verificação de permissão

router.put("/:id", authMiddleware ,validateSchema(schema.monitoriaUpdateIdSchema, "params"), validateSchema(schema.monitoriaUpdateSchema, "body") , MonitoriaController.update);
router.delete("/:id",  authMiddleware, validateSchema(schema.monitoriaDeleteSchema, "params"), MonitoriaController.delete);

export default router;