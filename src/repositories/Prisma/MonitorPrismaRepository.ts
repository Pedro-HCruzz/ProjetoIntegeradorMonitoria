import {prisma} from "../Prisma/client.js";
import { Monitor } from "@prisma/client";
import { Perfil } from "@prisma/client";

class MonitorPrismaRepository{
    async getAll(): Promise <Monitor[]>{
        const dadosMonitor = await prisma.monitor.findMany({
            include : {
                aluno : true,
                monitorias : true
            }
        });
        return dadosMonitor;
    }
    async getById(id : string) : Promise <Monitor | null>{
        const monitorDados = await prisma.monitor.findFirst({
            where : {
                id : id
            }
        })

        return monitorDados;
    }
    async createAndUpdate(id : string) : Promise<Monitor>{
        const monitor = await prisma.$transaction(async (tx) => {
            const Novomonitor = await tx.monitor.create({ // Crio monitor
                data : {id}
            })

            await tx.aluno.update({ // atualizo o Aluno
                where : {
                    id : id
                }, 
                data : {perfil : Perfil.MONITOR}
            })

            return Novomonitor;
        })
        return monitor
    }
    async update(id : string, data : Monitor) : Promise <Monitor | null>{
        const monitorAtualizado = await prisma.monitor.update({
            data, where : {
                id : id
            }
        })

        return monitorAtualizado;

    }
    async delete(id : string) : Promise <Monitor | null>{
        const monitorApagado = await prisma.monitor.delete({
            where : {
                id : id
            }
        })

        return monitorApagado;
    }
}


export default MonitorPrismaRepository;