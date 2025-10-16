
import { Router } from "express";
import alunoRoutes from "../routes/Aluno/alunoRoutes"
import loginRoutes from "../routes/Paginas/loginRoutes"
import homeRoutes from "../routes/Paginas/homeRoutes";
import monitorRoutes from "../routes/Monitor/monitorRoutes"
import monitoriaRoutes from "../routes/Monitoria/monitoriaRoutes"
import disciplinaRoutes from "../routes/Disciplina/disciplinaRoutes"
import inscriacaoRoutes from "../routes/Inscricao/inscricaoRoutes"

const router = Router();

router.use("/aluno", alunoRoutes);
router.use("/monitor" , monitorRoutes )
router.use("/disciplina" , disciplinaRoutes )
router.use("/monitoria" , monitoriaRoutes )
router.use("/inscricoes" , inscriacaoRoutes)
router.use("/login", loginRoutes);
router.use("/home" , homeRoutes )

export default router;
