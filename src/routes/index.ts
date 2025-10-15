
import { Router } from "express";
import alunoRoutes from "./alunoRoutes";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import monitorRoutes from "./monitorRoutes"
import monitoriaRoutes from "./monitoriaRoutes"
import disciplinaRoutes from "./disciplinaRoutes"
import inscriacaoRoutes from "./inscricaoRoutes"

const router = Router();

router.use("/aluno", alunoRoutes);
router.use("/monitor" , monitorRoutes )
router.use("/disciplina" , disciplinaRoutes )
router.use("/monitoria" , monitoriaRoutes )
router.use("/inscricoes" , inscriacaoRoutes)
router.use("/login", loginRoutes);
router.use("/user" , userRoutes )

export default router;
