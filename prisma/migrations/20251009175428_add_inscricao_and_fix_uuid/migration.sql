-- CreateTable
CREATE TABLE "public"."Inscricao" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "monitoriaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Inscricao" ADD CONSTRAINT "Inscricao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "public"."Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inscricao" ADD CONSTRAINT "Inscricao_monitoriaId_fkey" FOREIGN KEY ("monitoriaId") REFERENCES "public"."Monitoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
