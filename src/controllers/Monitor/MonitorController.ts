import { Request, Response } from "express";
import MonitorService from "../../services/Monitor/MonitorService.js";
import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository.js";
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository.js";

const monitorService = new MonitorService(new MonitorPrismaRepository, new AlunoPrismaRepository);

class MonitorController{


    async getAll(Req : Request, Res : Response){
        try {
            const dadosMonitor = await monitorService.getAll();
            return Res.status(200).json(dadosMonitor)
        } catch (err : any) {
            Res.status(500).json({err : err.message})
        }
    }
    async create(Req: Request, Res: Response) {
        try {
            const dados = Req.body;
            const monitorCriado = await monitorService.create(dados);

            return Res.status(201).json(monitorCriado);

        } catch (err: any) {

            if (err.message === "ALUNO_INEXISTENTE") {
                return Res.status(400).json({ error: err.message });
            }
            if (err.message === "MONITOR_EXISTE") {
                return Res.status(400).json({ error: err.message });
            }
            return Res.status(500).json({ error: "ERRO_INTERNO_DO_SERVIDOR" });
        }
    }

    async getById(Req : Request, Res : Response){
        try {
            const {id} = Req.params;
            const monitorDados = await monitorService.getById(id)

            return Res.status(200).json(monitorDados)

        } catch (err : any) {
            return Res.status(400).json({error : err.message})
        }
    }
    async update(Req : Request, Res : Response){
        try {
            const {id} = Req.params
            const dados = Req.body
            const monitorDados = await monitorService.update(id, dados)

            return Res.status(200).json(monitorDados)
        } catch (err : any) {
            return Res.status(400).json({error : err.message})
        }
    }
    async delete(Req : Request, Res : Response){
        try {
            const {id} = Req.params
            const monitorDados = await monitorService.delete(id)

            return Res.status(200).json(monitorDados)
            
        } catch (err : any) {
            return Res.status(400).json({error : err.message})
        }
    }
}

export default new MonitorController;