import {prisma} from "../Prisma/client";
import { Monitor } from "@prisma/client";

class MonitorPrismaRepository{
    async getAll(): Promise <Monitor[]>{
        const dadosMonitor = await prisma.monitor.findMany();
        return dadosMonitor;
    }
}


export default MonitorPrismaRepository;