import {prisma} from "../Prisma/client";
import { Monitor } from "@prisma/client";

class MonitorPrismaRepository{
    async getAll(): Promise <Monitor[]>{
        const dadosMonitor = await prisma.monitor.findMany();
        return dadosMonitor;
    }
    async findByEmail(email : string) : Promise <Monitor | null>{
            const monitorEmail = await prisma.monitor.findFirst({
                where : {
                    email : email
                }
            })
    
            return monitorEmail;
        }
    async getById(id : string) : Promise <Monitor | null>{
        const monitorDados = await prisma.monitor.findFirst({
            where : {
                id : id
            }
        })

        return monitorDados;
    }
    async create(data : Monitor) : Promise <Monitor>{
        
        const novoMonitor = await prisma.monitor.create({
            data
        })

        return novoMonitor;
    }
    async update(id : string, data : Monitor) : Promise <Monitor | null>{
        const monitorAtualizado = await prisma.monitor.update({
            data, where : {
                id : id
            }
        })

        return monitorAtualizado;

    }
    async delete(id : string) : Promise <Monitor>{
        const monitorApagado = await prisma.monitor.delete({
            where : {
                id : id
            }
        })

        return monitorApagado;
    }
}


export default MonitorPrismaRepository;