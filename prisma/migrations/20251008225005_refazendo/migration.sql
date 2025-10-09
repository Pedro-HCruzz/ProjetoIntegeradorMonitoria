/*
  Warnings:

  - You are about to drop the column `curso` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina` on the `Monitoria` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricula` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplinaId` to the `Monitoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Aluno" DROP CONSTRAINT "Aluno_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Monitor" DROP CONSTRAINT "Monitor_usuarioId_fkey";

-- DropIndex
DROP INDEX "public"."Aluno_usuarioId_key";

-- DropIndex
DROP INDEX "public"."Monitor_usuarioId_key";

-- AlterTable
ALTER TABLE "public"."Aluno" DROP COLUMN "curso",
DROP COLUMN "telefone",
DROP COLUMN "usuarioId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "matricula" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Monitor" DROP COLUMN "departamento",
DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "public"."Monitoria" DROP COLUMN "disciplina",
ADD COLUMN     "disciplinaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Usuario";

-- DropEnum
DROP TYPE "public"."TipoUsuario";

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "public"."Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "public"."Aluno"("matricula");

-- AddForeignKey
ALTER TABLE "public"."Monitor" ADD CONSTRAINT "Monitor_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Monitoria" ADD CONSTRAINT "Monitoria_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
