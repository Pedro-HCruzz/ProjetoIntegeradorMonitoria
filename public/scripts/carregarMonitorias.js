import { getAlunoId } from "./carregarNomeUsuario.js";


async function carregarMonitorias() {
    const lista = document.getElementById("listamonitorias")
    const idAluno = getAlunoId();

    try {
        
        // pegar todas as monitorias do backend
        const response = await fetch("/monitoria" , { 
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }) 

        // pegar inscricoes do aluno em alguma monitoria
        const respInscricao = await fetch(`/inscricoes/aluno`, { 
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (!response.ok){
            throw new Error ("ERRO_AO_CARREGAR");
        }

        // pegando o objeto json que retornar para manipular informações, como dados da monitoria ( local, data, disciplina) e dados da inscricao (principalmente o id da inscricao para depois podermos excluir )
        const monitorias = await response.json();
        const inscricoes = await respInscricao.json();

        if (monitorias.length === 0){
            lista.innerHTML = "Nenhuma monitoria encontrada!"
            return;
        }

        lista.innerHTML = ""; 

        // 🔹 Cria o popup global - popup relacionado a inscrição 

        const popup = document.createElement("div");
        popup.classList.add("popup", "hidden");

        popup.innerHTML = `
        <div class="popup-content">
            <p>Deseja cancelar sua inscrição?</p>
            <button class="btn-cancelar">Cancelar inscrição</button>
            <button class="btn-fechar">Fechar</button>
        </div>
        `;
        document.body.appendChild(popup);

        // 🔹 Seleciona botões do popup
        const btnCancelarInscricaoPopup = popup.querySelector(".btn-cancelar");
        const btnFecharPopup = popup.querySelector(".btn-fechar");

        // 🔹 Renderizar as monitorias
        monitorias.forEach((m) => {
            const li = document.createElement("li");
            li.classList.add("cardmonitoria");

            li.innerHTML = `
            <div class="informacoesmonitoria">
                <div class="nomemonitoria">${m.nome_monitoria}</div>
                <div class="disciplinamonitoria">${m.disciplina.nome}</div>
                <div class="datamonitoria">
                        ${new Date(m.data).toLocaleDateString()} - 
                        ${new Date(m.hora_inicio).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </div>
            </div>
            `;

            // lógica para o popup ao clicar nas monitorias e mostrar informações 

            const popupInfoMonitoria = document.getElementById("popupInfoMonitoria");
            const popupTitulo = document.getElementById("popupTitulo");
            const popupDisciplina = document.getElementById("popupDisciplina");
            const popupMonitor = document.getElementById("popupMonitor");
            const popupLocal = document.getElementById("popupLocal");
            const popupDataHora = document.getElementById("popupDataHora");


            popupInfoMonitoria.addEventListener("click", (e) => {
            if (e.target === popupInfoMonitoria) popupInfoMonitoria.classList.add("hidden"); // fecha clicando fora do conteúdo
            });


            li.addEventListener("click", (e) => {
                if (e.target.tagName.toLowerCase() === "button") return;
                
                popupTitulo.textContent = m.nome_monitoria;
                popupDisciplina.textContent = `Disciplina: ${m.disciplina.nome}`;
                popupMonitor.textContent = `Monitor: ${m.monitor.aluno.nome}`;
                popupLocal.textContent = `Local: ${m.local}`;
                popupDataHora.textContent = `Data/Hora: ${new Date(m.data).toLocaleDateString()} - ${new Date(m.hora_inicio).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;


                popupInfoMonitoria.classList.remove("hidden");
            });



            // 🔹 Botão de inscrição

            const divBotao = document.createElement("div");
            divBotao.classList.add("divbotao")
            const botaoInscrever = document.createElement("button");
            botaoInscrever.dataset.id = m.id;

            const jaInscrito = inscricoes.find((i) => i.monitoriaId === m.id)


            if (jaInscrito) {
                botaoInscrever.textContent = "Inscrito";
                botaoInscrever.classList.add("btn-inscrito");
                botaoInscrever.dataset.inscricaoId = jaInscrito.id // salvando o id da inscrição no button `
            } else {
                botaoInscrever.textContent = "Inscreva-se";
                botaoInscrever.classList.add("btn-inscrever");
            }

            divBotao.appendChild(botaoInscrever);
            li.appendChild(divBotao);

            // 🔹 Evento do botão de se inscrever

            botaoInscrever.addEventListener("click", async () => { // lógica da inscrição
                const alunoId = getAlunoId()
                
                if (botaoInscrever.classList.contains("btn-inscrito")){
                    popup.classList.remove("hidden")
                    popup.dataset.targetButtonId = m.id;
                    return;
                }
                try {
                    const responseFazerInscricao = await fetch(`/inscricoes`, {
                        method : "POST",
                        headers : {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body : JSON.stringify({alunoId : alunoId, monitoriaId : m.id})
                    })

                    if (!responseFazerInscricao.ok){
                        throw new Error ("ERRO_AO_FAZER_INSCRICAO")
                    }

                    const dadosDaInscricao = await responseFazerInscricao.json();

                    botaoInscrever.textContent = "Inscrito";
                    botaoInscrever.classList.remove("btn-inscrever");
                    botaoInscrever.classList.add("btn-inscrito");
                    botaoInscrever.dataset.inscricaoId = dadosDaInscricao.id; // aqui a gente pega o id da inscricao para poder mandar nos params do delete depois 
                } catch (err) {
                    lista.innerHTML = `<li>Erro ao carregar inscricao: ${err.message}</li>`;
                }
            });

            lista.appendChild(li);
        });

        // 🔹 Eventos globais do popup
        
        btnFecharPopup.addEventListener("click", () => {
            popup.classList.add("hidden");
        });

        //Cancelar uma inscricao

        btnCancelarInscricaoPopup.addEventListener("click", async () => {
            const monitoriaAtiva = popup.dataset.targetButtonId;
            const botao = document.querySelector(`button[data-id="${monitoriaAtiva}"]`);
            const inscricaoId = botao.dataset.inscricaoId;

            try {
                const responseCancelarInscricao = await fetch(`/inscricoes/${inscricaoId}` , { // fetch para a rota de deletar uma inscrição, pegando o id da inscrição e passando nos params da rota
                    method : "DELETE",
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(!responseCancelarInscricao.ok){
                    throw new Error ("ERRO_AO_CANCELAR")
                }

                botao.textContent = "Inscreva-se";
                botao.classList.remove("btn-inscrito");
                botao.classList.add("btn-inscrever");
                delete botao.dataset.inscricaoId;
                popup.classList.add("hidden");

            } catch (err) {
                alert("Erro ao cancelar inscrição. Tente novamente.");

            }
        });

        // Lógica para filtrar as monitorias
        
        const buscarMonitoria = document.getElementById("buscaMonitoria");
        const filtrar = () => {
            const termo = buscarMonitoria.value.toLowerCase();
            document.querySelectorAll(".cardmonitoria").forEach(card => {
                const nomeMonitoria = card.querySelector(".nomemonitoria").textContent.toLowerCase();
                card.style.display = nomeMonitoria.includes(termo) ? "" : "none";
            });
        };

        buscarMonitoria.addEventListener("input", filtrar);

    } catch (err) {
        lista.innerHTML = `<li>Erro ao carregar monitorias: ${err.message}</li>`;
    }
}   

carregarMonitorias();
