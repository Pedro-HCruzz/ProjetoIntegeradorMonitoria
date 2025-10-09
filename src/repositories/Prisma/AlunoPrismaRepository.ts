import { PrismaClient } from "@prisma/client";
import { Aluno } from "@prisma/client";

const prisma = new PrismaClient()


class AlunoPrismaRepository{
    async getAll() : Promise <Aluno[]>{
        const alunos = await prisma.aluno.findMany();

        return alunos;

    }
    async findByEmail(email : string) : Promise <Aluno | null>{
        const alunoEmail = await prisma.aluno.findFirst({
            where : {
                email : email
            }
        })

        return alunoEmail;
    }
    async getById(id : string) : Promise <Aluno | null>{
        const alunoEmail = await prisma.aluno.findFirst({
            where : {
                id : id
            }
        })

        return alunoEmail;
    }
    async create(data : Aluno) : Promise <Aluno>{
       
        const novoAluno = await prisma.aluno.create({
            data
        })

        return novoAluno;
    }
    async update(id : string, data : Aluno) : Promise <Aluno | null>{
        const alunoAtualizado = await prisma.aluno.update({
            data, where : {
                id : id
            }
        })

        return alunoAtualizado;

    }
    async delete(id : string) : Promise <Aluno>{
        const alunoApagado = await prisma.aluno.delete({
            where : {
                id : id
            }
        })

        return alunoApagado;
    }
}




export default AlunoPrismaRepository;