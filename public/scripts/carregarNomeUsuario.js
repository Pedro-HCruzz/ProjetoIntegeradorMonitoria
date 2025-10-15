export function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
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
