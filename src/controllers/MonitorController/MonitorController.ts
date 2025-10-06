import { Request, Response } from "express";
import MonitorService from "../../services/MonitorService/MonitorService";
import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository";

const monitorService = new MonitorService(new MonitorPrismaRepository);

class MonitorController{


    async getAll(Req : Request, Res : Response){
        try {
            const dadosMonitor = await monitorService.getAll();
            Res.status(200).json(dadosMonitor)
        } catch (err : any) {
            Res.status(500).json({err : err.message})
        }
    }
    async create(req: Request, res: Response) {
        try {
            const dados = req.body;

            if (!dados.nome || !dados.email) {
                return res.status(400).json("DADOS_OBRIGATORIOS");
            }

            const monitorCriado = await monitorService.create(dados);

            return res.status(201).json(monitorCriado);

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ erro: "ERRO_INTERNO" });
        }
    }

    async getById(Req : Request, Res : Response){
        try {
            const {id} = Req.params;

            if (!id){
                return Res.status(400).json("ID_OBRIGATORIO")
            }

            const alunosDados = await monitorService.getById(id)

            Res.status(200).json(alunosDados)

        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async update(Req : Request, Res : Response){
        try {
            const {id} = Req.params
            const dados = Req.body

            if (!dados || !id){
                return Res.status(400).json("DADOS_OBRIGATORIOS")
            }

            const alunoDados = await monitorService.update(id, dados)


            Res.status(200).json(alunoDados)
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
    async delete(Req : Request, Res : Response){
        try {
            const {id} = Req.params

            if (!id){
                return Res.status(400).json("MONITOR_INEXISTENTE")
            }

            const alunoDados = await monitorService.delete(id)

            Res.status(200).json(alunoDados)
            
        } catch (err : any) {
            Res.status(400).json({error : err.message})
        }
    }
}

export default new MonitorController;