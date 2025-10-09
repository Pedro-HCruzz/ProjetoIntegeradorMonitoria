
import { Router } from "express";
import alunoRoutes from "./alunoRoutes";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import monitorRoutes from "./monitorRoutes"
import monitoriaRoutes from "./monitoriaRoutes"
import disciplinaRoutes from "./disciplinaRoutes"

const router = Router();

router.use("/aluno", alunoRoutes);
router.use("/monitor" , monitorRoutes )
router.use("/disciplina" , disciplinaRoutes )
router.use("/monitoria" , monitoriaRoutes )
router.use("/login", loginRoutes);
router.use("/user" , userRoutes )

export default router;
