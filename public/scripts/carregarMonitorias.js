async function carregarMonitorias() {
    const lista = document.getElementById("lista-monitorias")

    try {
        const response = await fetch("http://localhost:3000/monitoria")

        if (!response.ok){
            throw new Error ("ERRO_AO_CARREGAR");
        }

        const monitorias = await response.json();

        if (monitorias.length === 0){
            lista.innerHTML = "Nenhuma monitoria encontrada!"
            return;
        }

        console.log(monitorias)

        lista.innerHTML = ""; // clear list before adding new items

        monitorias.forEach((m)  =>{
            const li = document.createElement("li");

        li.innerHTML = `
            <div class="disciplina">${m.nome_monitoria}</div>
            <div>${m.disciplina.nome}</div>
            <div>${m.monitor.aluno.nome}</div>
            <div class="local">${m.local || "Local não informado"}</div>
            <div>${new Date(m.data).toLocaleDateString()} - ${new Date(m.hora_inicio).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
            `
            lista.appendChild(li);
        })
        
        

    } catch (err) {
        lista.innerHTML = `<li>Erro ao carregar monitorias: ${err.message}</li>`;
    }
}   

carregarMonitorias();
