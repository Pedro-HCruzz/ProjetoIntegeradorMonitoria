import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url"; // adicionando por causa do ES Module
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";

dotenv.config();

const server = express();

server.use(cors({
  origin: "https://projetointegeradormonitoria.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


server.use(express.json());
server.use(express.urlencoded({extended : true}))
server.use(routes);

/*ADICIONANDO AS VARIÁVEIS PARA RODAR DEVIDO A MUDANÇA PARA O ESM**/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(process.cwd(), "public")));



const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});

// meu server.ts está responsável por: usar cors, instanciar o servidor e usar as rotas do routes