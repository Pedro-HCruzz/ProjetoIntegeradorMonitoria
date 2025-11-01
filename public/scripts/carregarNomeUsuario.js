export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}


export function getAlunoId(){
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = parseJwt(token);
    return payload?.id || null; 
}

export function carregarUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = 'login.html';

    const payload = parseJwt(token);
    if (!payload || !payload.nome) {
        localStorage.removeItem('token');
        return window.location.href = 'login.html';
    }

    document.getElementById('usuarioNome').innerText = payload.nome;
}

carregarUsuario();
