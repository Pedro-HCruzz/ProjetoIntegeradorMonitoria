const botaoMenu = document.querySelector('nav .icone img[src="../assets/img/iconeMenu.png"]');
const menuLateral = document.getElementById('menuLateral');
const botaoFechar = document.getElementById('fecharMenu');

// Abrir menu ao clicar no ícone
botaoMenu.addEventListener('click', (e) => {
  e.preventDefault();
  menuLateral.classList.add('ativo');
});

// Fechar menu ao clicar no botão X
botaoFechar.addEventListener('click', () => {
  menuLateral.classList.remove('ativo');
});
