
import { Router } from "express";
import alunoRoutes from "./alunoRoutes";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import monitorRoutes from "./monitorRoutes"


const router = Router();

router.use("/monitor" , monitorRoutes )
router.use("/alunos", alunoRoutes);
router.use("/login", loginRoutes);
router.use("/user" , userRoutes )

export default router;
