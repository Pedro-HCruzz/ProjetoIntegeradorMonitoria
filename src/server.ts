import dotenv from "dotenv"
import path from "path";
import routes from "./routes";
import express from "express";
import cors from "cors";

dotenv.config();

const server = express();

server.use(cors({
  origin: "https://projetointegeradormonitoria-1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// server.use(express.static("public")); //arquivos html
server.use(express.static(path.join(__dirname, "..", "public")));
server.use(express.json());
server.use(express.urlencoded({extended : true}))
server.use(routes);

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});

// meu server.ts está responsável por: usar cors, instanciar o servidor e usar as rotas do routes