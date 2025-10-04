import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository";
import { Monitor } from "@prisma/client";


class MonitorService {

    constructor (private _monitorRepository : MonitorPrismaRepository){}

    async getAll() : Promise <Monitor[]>{
        const dadosMonitor = await this._monitorRepository.getAll();
        return dadosMonitor;
    }

}



export default MonitorService;