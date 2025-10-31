import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    console.log("DATABASE_URL =", process.env.DATABASE_URL);

    // tenta uma query simples
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ Conexão com banco OK:", result);
  } catch (err) {
    console.error("❌ Erro conexão banco:", err);
  } finally {
    await prisma.$disconnect();
  }
})();
