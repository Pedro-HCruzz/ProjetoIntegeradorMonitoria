import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository.js";
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository.js";
import { Monitor } from "@prisma/client";
import { Aluno, Perfil } from "@prisma/client";
import { string } from "yup";



class MonitorService {

    constructor (private _monitorRepository : MonitorPrismaRepository, private _alunoRepository : AlunoPrismaRepository){}

    async getAll() : Promise <Monitor[]>{
        const dadosMonitor = await this._monitorRepository.getAll();
        return dadosMonitor;
    }
    async create(dados : {id :string}) : Promise<Monitor>{
        const existeAluno = await this._alunoRepository.getById(dados.id)

        if (!existeAluno){
            throw new Error ("ALUNO_INEXISTENTE")
        }

        const monitor = await this._monitorRepository.getById(dados.id)
        // segundo, verificar se já é
        if (monitor){
            throw new Error ("MONITOR_EXISTE")
        }

        try {
            await this._monitorRepository.createAndUpdate(dados.id) // criando monitor
            existeAluno.perfil = Perfil.MONITOR //atribuindo o novo perfil

        } catch (error) {
           throw new Error("ERRO_AO_CADASTRAR_MONITOR")
        }

        return existeAluno;
    }
    async getById(id : string) : Promise <Monitor>{
        const monitorDados = await this._monitorRepository.getById(id)

        if (!monitorDados){
            throw new Error ("MONITOR_INEXISTENTE")
        }

        return monitorDados;
    }
    
    async update(id : string, dados : Aluno) : Promise <Aluno>{
        const monitor = await this._monitorRepository.getById(id)

        if (!monitor){
            throw new Error ("MONITOR_INEXISTENTE")
        }

        const monitorAtualizado = await this._alunoRepository.update(id , dados)

        
        if (!monitorAtualizado) {
            throw new Error("ALUNO_INEXISTENTE");
        }

        return monitorAtualizado;

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