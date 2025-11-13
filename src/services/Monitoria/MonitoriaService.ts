import MonitoriaPrismaRepository from "../../repositories/Prisma/MonitoriaPrismaRepository.js";
import { Monitoria } from "@prisma/client";


class MonitoriaService {

    constructor (private _monitoriaRepository : MonitoriaPrismaRepository){}

    async getAll() : Promise <Monitoria[]>{
        const dadosmonitoria = await this._monitoriaRepository.getAll();
        return dadosmonitoria;
    }

    async create(dados : Monitoria) : Promise<Monitoria>{

        const horaInicio = new Date(`${dados.data}T${dados.hora_inicio}:00`); // adiciono a data, o T para complementar o padrao aceito pelo Prisma e o 00 também para se adequar ao padrão
        const horaFim = new Date(`${dados.data}T${dados.hora_fim}:00`);
        
        const dadosAlterados = {
            ...dados,
            data : new Date(),
            hora_inicio : horaInicio,   
            hora_fim : horaFim
        }
        
        const dadosMonitoria = await this._monitoriaRepository.create(dadosAlterados)

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