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
    
    async update(id : string, dados : Partial<Monitoria>) : Promise <Monitoria>{ // agora adicionamos uma partial para informar que os campos são opcionais
        const monitoriaAtual = await this._monitoriaRepository.getById(id)

        if (!monitoriaAtual){
            throw new Error ("MONITORIA_INEXISTENTE")
        }

        let dataString;
        if (dados.data){
            dataString = dados.data;
        } else {
            dataString = monitoriaAtual.data.toISOString().split("T")[0];
        }
        
        let horaInicioString;
        if(dados.hora_inicio){
            horaInicioString = dados.hora_inicio;
        } else {
            horaInicioString = monitoriaAtual.hora_inicio.toISOString().substring(11, 16);
        }

        let horaFimString;
        if(dados.hora_fim){
            horaFimString = dados.hora_fim;
        } else {
        
            horaFimString =  monitoriaAtual.hora_fim.toISOString().substring(11, 16);
        
        }
        
        const novaData = new Date(`${dataString}T00:00:00`);
        const novoInicio = new Date(`${dataString}T${horaInicioString}:00`);
        const novoFim = new Date(`${dataString}T${horaFimString}:00`);

        const dadosAtualizados = {
            ...monitoriaAtual,
            ...dados,
            data : novaData,
            hora_inicio : novoInicio,
            hora_fim : novoFim
        }

        

        const dadosMonitoria = await this._monitoriaRepository.update(id, dadosAtualizados)

        if(!dadosMonitoria){
            throw new Error ("ERRO_AO_ATUALIZAR");
            
        } 
        return dadosMonitoria;

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