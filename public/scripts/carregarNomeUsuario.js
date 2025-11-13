import {parseJwt} from "./utils/parseJWT.js"

export function carregarUsuario() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  const payload = parseJwt(token);
  if (!payload || !payload.nome) {
    localStorage.removeItem('token');
    return window.location.href = 'login.html';
  }

  document.querySelectorAll('.usuarioNome').forEach(e => {
    e.innerText = payload.nome;
  });

  document.getElementById("perfilUsuarioMenu").innerText = `${payload.perfil}`
}

carregarUsuario();
