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
}

export default new MonitorController;