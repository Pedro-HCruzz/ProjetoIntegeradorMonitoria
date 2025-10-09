/*
  Warnings:

  - You are about to drop the column `created_At` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Monitor` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Monitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Monitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('ADMIN', 'MONITOR', 'ALUNO');

-- DropIndex
DROP INDEX "public"."Aluno_email_key";

-- AlterTable
ALTER TABLE "public"."Aluno" DROP COLUMN "created_At",
DROP COLUMN "email",
DROP COLUMN "nome",
DROP COLUMN "senha",
DROP COLUMN "updated_At",
ADD COLUMN     "curso" TEXT,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Monitor" DROP COLUMN "email",
DROP COLUMN "nome",
ADD COLUMN     "departamento" TEXT,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "public"."TipoUsuario" NOT NULL DEFAULT 'ALUNO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_usuarioId_key" ON "public"."Aluno"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_usuarioId_key" ON "public"."Monitor"("usuarioId");

-- AddForeignKey
ALTER TABLE "public"."Aluno" ADD CONSTRAINT "Aluno_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Monitor" ADD CONSTRAINT "Monitor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
