-- CreateTable
CREATE TABLE "public"."Monitor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Monitoria" (
    "id" TEXT NOT NULL,
    "nome_monitoria" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fim" TIMESTAMP(3) NOT NULL,
    "local" TEXT,
    "monitorId" TEXT NOT NULL,

    CONSTRAINT "Monitoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Monitoria" ADD CONSTRAINT "Monitoria_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "public"."Monitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
