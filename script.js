// ---------- Tema ----------
const temaToggle = document.getElementById('temaToggle');
temaToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// ---------- Menu lateral ----------
const abrirMenu = document.getElementById('abrirMenu');
const fecharMenu = document.getElementById('fecharMenu');
const menuLateral = document.getElementById('menuLateral');

abrirMenu.addEventListener('click', () => menuLateral.classList.add('ativo'));
fecharMenu.addEventListener('click', () => menuLateral.classList.remove('ativo'));

// ---------- Modais ----------
const btnLogin = document.getElementById('btnLogin');
const modalLogin = document.getElementById('modalLogin');
const modalCadastro = document.getElementById('modalCadastro');

btnLogin.addEventListener('click', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if(!usuario) modalLogin.style.display = 'flex';
});

document.getElementById('abrirCadastro').addEventListener('click', () => {
  modalLogin.style.display = 'none';
  modalCadastro.style.display = 'flex';
});

document.getElementById('abrirLogin').addEventListener('click', () => {
  modalCadastro.style.display = 'none';
  modalLogin.style.display = 'flex';
});

window.addEventListener('click', (e) => {
  if(e.target == modalLogin) modalLogin.style.display = 'none';
  if(e.target == modalCadastro) modalCadastro.style.display = 'none';
});

// ---------- Usuário ----------
const usuarioInfo = document.getElementById('usuarioInfo');

function atualizarInterfaceUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const usuarioNome = document.getElementById('usuarioNome');

  if(usuario){
    // Mostra o "Olá, Nome" ao lado do ícone
    usuarioNome.textContent = `Olá, ${usuario.nome}`;

    document.getElementById('usuarioInfo').innerHTML = `
      <strong>Nome:</strong> ${usuario.nome}<br>
      <strong>Login:</strong> ${usuario.login}<br>
      <button id="logoutBtn" style="
        margin-top:8px;
        padding:6px 10px;
        border:none;
        border-radius:8px;
        cursor:pointer;
        background:#00bfa5;
        color:#fff;
      ">Sair</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      atualizarInterfaceUsuario();
    });

  } else {
    usuarioNome.textContent = '';
    document.getElementById('usuarioInfo').textContent = 'Não logado';
  }
}



// ---------- Cadastro ----------
const formCadastro = document.getElementById('formCadastro');
formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = formCadastro[0].value.trim();
  const login = formCadastro[1].value.trim();
  const senha = formCadastro[2].value.trim();
  if(!nome || !login || !senha){ alert('Preencha todos os campos'); return; }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if(usuarios.some(u => u.login === login)){
    alert('Login já existe!');
    return;
  }

  const novoUsuario = {nome, login, senha};
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
  modalCadastro.style.display = 'none';
  atualizarInterfaceUsuario();
});

// ---------- Login ----------
const formLogin = document.getElementById('formLogin');
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const login = formLogin[0].value.trim();
  const senha = formLogin[1].value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(u => u.login === login && u.senha === senha);

  if(usuarioEncontrado){
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
    modalLogin.style.display = 'none';
    atualizarInterfaceUsuario();
  } else {
    alert('Usuário não encontrado ou senha incorreta!');
  }
});

// ---------- Inicial ----------
window.addEventListener('load', () => {
  atualizarInterfaceUsuario();
});
