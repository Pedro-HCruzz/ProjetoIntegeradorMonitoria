import MonitoriaPrismaRepository from "../../repositories/Prisma/MonitoriaPrismaRepository.js";
import { Monitoria } from "@prisma/client";


class MonitoriaService {

    constructor (private _monitoriaRepository : MonitoriaPrismaRepository){}

    async getAll() : Promise <Monitoria[]>{
        const dadosmonitoria = await this._monitoriaRepository.getAll();
        return dadosmonitoria;
    }

    async create(dados : Monitoria) : Promise<Monitoria>{
            const dadosMonitoria = await this._monitoriaRepository.create(dados)
            return dadosMonitoria;
        }
    async getById(id : string) : Promise <Monitoria>{
        const monitoriaDados = await this._monitoriaRepository.getById(id)

        if (!monitoriaDados){
            throw new Error ("MONITORIA_INEXISTENTE")
        }

        return monitoriaDados;
    }
    
    async update(id : string, dados : Monitoria) : Promise <Monitoria>{
        const monitoriaDados = await this._monitoriaRepository.update(id, dados)

        if (!monitoriaDados){
            throw new Error ("ERRO_AO_ATUALIZAR")
        }

        return monitoriaDados;
    }
    async delete(id : string) : Promise <Monitoria>{
        const monitoriaDados = await this._monitoriaRepository.delete(id)

        if (!monitoriaDados){
            throw new Error ("MONITORIA_INEXISTENTE")
        }

        return monitoriaDados;
    }

}



export default MonitoriaService;