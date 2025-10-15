import { PrismaClient } from "@prisma/client";
import { Inscricao } from "@prisma/client";

const prisma = new PrismaClient()


class InscricaoPrismaRepository{
    async getAll() : Promise <Inscricao[]>{
        const Inscricoes = await prisma.inscricao.findMany();
        return Inscricoes;

    }

    async findAlunoMonitoria(alunoId : string, monitoriaId : string) : Promise <Inscricao | null>{ // retorna se o aluno já erstá inscrito em uma monitoria
        const inscricao = await prisma.inscricao.findFirst({
            where : {
                alunoId , monitoriaId
            }
        })

        return inscricao;
    }

    async getInscricaoAluno(alunoId : string) : Promise <Inscricao[]>{ // retorna as inscricoes do aluno 
        const inscricao = await prisma.inscricao.findMany({
            where : {
                alunoId
            }
        })

        return inscricao;
    }

    async getById(id : string) : Promise <Inscricao | null>{
        const InscricaoId = await prisma.inscricao.findFirst({
            where : {
                id : id
            }
        })

        return InscricaoId;
    }
    async create(data : Inscricao) : Promise <Inscricao>{
        const novaInscricao = await prisma.inscricao.create({
            data
        })

        return novaInscricao;
    }
    async delete(id : string) : Promise <Inscricao>{
        const inscricaoApagado = await prisma.inscricao.delete({
            where : {
                id : id
            }
        })

        return inscricaoApagado;
    }
}

export default InscricaoPrismaRepository;