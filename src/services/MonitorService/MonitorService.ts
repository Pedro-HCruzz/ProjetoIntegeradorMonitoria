import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository";
import { Monitor } from "@prisma/client";


class MonitorService {

    constructor (private _monitorRepository : MonitorPrismaRepository){}

    async getAll() : Promise <Monitor[]>{
        const dadosMonitor = await this._monitorRepository.getAll();
        return dadosMonitor;
    }
    async create(dados : Monitor) : Promise<Monitor>{
            const emailMonitor = await this._monitorRepository.findByEmail(dados.email);

            if (emailMonitor) {
                throw new Error ("MONITOR_EXISTE")
            } 

            const dadosAlunos = await this._monitorRepository.create(dados)
            return dadosAlunos;
        }
    async getById(id : string) : Promise <Monitor>{
        const monitorDados = await this._monitorRepository.getById(id)

        if (!monitorDados){
            throw new Error ("MONITOR_INEXISTENTE")
        }

        return monitorDados;
    }
    
    async update(id : string, dados : Monitor) : Promise <Monitor>{
        const monitorDados = await this._monitorRepository.update(id, dados)

        if (!monitorDados){
            throw new Error ("ERRO_AO_ATUALIZAR")
        }

        return monitorDados;
    }
    async delete(id : string) : Promise <Monitor>{
        const monitorDados = await this._monitorRepository.delete(id)

        if (!monitorDados){
            throw new Error ("MONITOR_INEXISTENTE")
        }

        return monitorDados;
    }

}



export default MonitorService;