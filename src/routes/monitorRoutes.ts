import MonitorController from "../controllers/MonitorController/MonitorController";
import { Router } from "express";


const router =  Router();

router.get("/", MonitorController.getAll);
// router.get("/:id", MonitorController.getById);
// router.post("/", MonitorController.create);
// router.put("/:id", MonitorController.update);
// router.delete("/:id", MonitorController.delete);

export default router;