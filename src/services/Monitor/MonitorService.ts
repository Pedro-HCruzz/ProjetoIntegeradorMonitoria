import MonitorPrismaRepository from "../../repositories/Prisma/MonitorPrismaRepository";
import AlunoPrismaRepository from "../../repositories/Prisma/AlunoPrismaRepository";
import { Monitor } from "@prisma/client";
import { Aluno } from "@prisma/client";
import { compareSync } from "bcrypt";


class MonitorService {

    constructor (private _monitorRepository : MonitorPrismaRepository, private _alunoRepository : AlunoPrismaRepository){}

    async getAll() : Promise <Monitor[]>{
        const dadosMonitor = await this._monitorRepository.getAll();
        return dadosMonitor;
    }
    async create(dados : {id :string}) : Promise<Monitor>{
        const existeAluno = await this._alunoRepository.getById(dados.id)
         console.log(dados)
         console.log(existeAluno)
         // primeiro eu verifico se o id está cadastrado ou não

        if (!existeAluno){
            throw new Error ("ALUNO_INEXISTENTE")
        }

        const monitor = await this._monitorRepository.getById(dados.id)
        // segundo, verificar se já é
        if (monitor){
            throw new Error ("MONITOR_EXISTE")
        }

        const dadosMonitor = await this._monitorRepository.create(dados)
        return dadosMonitor;
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