import { Request, Response } from "express";
import MonitorService from "../../services/Monitor/MonitorService";
import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository";

const monitorService = new MonitorService(new MonitorPrismaRepository);

class MonitorController{


    async getAll(Req : Request, Res : Response){
        try {
            const dadosMonitor = await monitorService.getAll();
            return Res.status(200).json(dadosMonitor)
        } catch (err : any) {
            Res.status(500).json({err : err.message})
        }
    }
    async create(req: Request, res: Response) {
        try {
            const dados = req.body;
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