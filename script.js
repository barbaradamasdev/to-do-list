let usuarioLogado, usuario;

// LOGIN

function loginDoUsuario(){
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;

  const jsonData = localStorage.getItem('dados.json');
  const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };

  usuario = data.usuarios.find(usuario => usuario.email === email);
  
  if (usuario && usuario.password === password) {
    usuarioLogado = usuario.id;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    alert('Login bem-sucedido! Redirecionando...');
    setTimeout(function () {
      window.location.href = 'userPage.html';
  }, 0500);
  } else {
    alert('Email ou senha incorretos. Tente novamente.');
  }
}

// CADASTRO

function cadastrarNovoUsuario(){
    let nome = document.getElementById('cadastro-nome').value;
    let email = document.getElementById('cadastro-email').value;
    let password = document.getElementById('cadastro-password').value;

    criptografarPassword(password);

    const jsonData = localStorage.getItem('dados.json');
    const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };

    let userId = parseInt(localStorage.getItem('userId')) || 0;
    userId++;

    novoUsuario = {
        id: userId,
        nome: nome,
        email: email,
        password: password,
        tarefas: []
    };

    data.usuarios.push(novoUsuario);
  
    localStorage.setItem('dados.json', JSON.stringify(data));
    localStorage.setItem('userId', userId);
    usuarioLogado = novoUsuario;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    alert("Cadastro realizado com sucesso! Redirecionando...");
    setTimeout(function () {
      window.location.href = 'userPage.html';
  }, 0500);
}

// CRIPTOGRAFIA (funciona com backend)

async function criptografarPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
}

// LOGOUT

function logoutDoUsuario(){
  localStorage.removeItem('usuarioLogado');
  usuarioLogado = null;
  alert('Você está sendo deslogado! Redirecionando...');
    setTimeout(function () {
      window.location.href = 'index.html';
  }, 0500);
}

// DOM LOADED => Todas as paginas

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoJSON) {
      const jsonData = localStorage.getItem('dados.json');
      const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
      
      usuarioLogado = JSON.parse(usuarioLogadoJSON);
      usuario = data.usuarios.find(user => user.id === usuarioLogado);

      document.getElementById('nome-usuario').innerText = usuario.nome;
      atualizarTabela(usuario);

    } else {
      if (window.location.pathname !== '/pages/index.html') {
        window.location.href = 'index.html';
      }
    }
});


// DOM LOADED => USER PAGE

if (window.location.pathname.includes('userPage.html')) {
  const dataDeHoje = new Date().toISOString().split('T')[0]; 

  document.getElementById('task-data-inicio').setAttribute('min', dataDeHoje);

  document.getElementById('task-data-inicio').addEventListener('change', function() {
      document.getElementById('task-data-termino').removeAttribute('disabled');
      document.getElementById('task-data-termino').setAttribute('min', this.value);
  });

  document.getElementById('edit-task-data-inicio').setAttribute('min', dataDeHoje);

  document.getElementById('edit-task-data-inicio').addEventListener('change', function() {
      document.getElementById('edit-task-data-termino').setAttribute('min', this.value);;
      document.getElementById('task-data-termino').setAttribute('min', this.value);
  });
}

// ADICIONA DADOS DO CADASTRO

function adicionarDadosAoBanco() {
  let tarefa = document.getElementById('task-nome').value;
  let inicioData = document.getElementById('task-data-inicio').value;
  let inicioHorario = document.getElementById('task-hora-inicio').value;
  let terminoData = document.getElementById('task-data-termino').value;
  let terminoHorario = document.getElementById('task-hora-termino').value;
  let descricao = document.getElementById('task-descricao').value;
  let status = 'Pendente';

  if (descricao.length <= 0) {
      descricao = "Não há descrição!";
  }

  if (inicioData.length <= 0) {
      alert('Por favor, insira uma data válida para Data início.');
      return
  }

  if (inicioHorario.length <= 0) {
      alert('Por favor, insira uma hora válida para Hora início.');
      return
  }

  if (terminoData.length <= 0) {
      alert('Por favor, insira uma data válida para Data término.');
      return
  }

  if (terminoHorario.length <= 0) {
      alert('Por favor, insira uma hora válida para Hora término.');
      return
  }

  const jsonData = localStorage.getItem('dados.json');
  const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
  usuario = data.usuarios.find(user => user.id === usuarioLogado);

  let taskId = parseInt(localStorage.getItem('taskId')) || 0;
  taskId++;

  novaTarefa = {
      id: taskId,
      tarefa: tarefa,
      inicio: inicioData,
      horario_inicio: inicioHorario,
      termino: terminoData,
      horario_termino: terminoHorario,
      descricao: descricao,
      status: status
  };

  usuario.tarefas.push(novaTarefa);

  localStorage.setItem('dados.json', JSON.stringify(data));
  localStorage.setItem('taskId', taskId);

  atualizarTabela();
  document.getElementById('taskForm').reset();
}

// ATUALIZAR TABELA

function atualizarTabela() {
  var table = document.getElementById('table');
  const tbody = table.getElementsByTagName('tbody')[0];

  const jsonData = localStorage.getItem('dados.json');
  const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
  usuario = data.usuarios.find(user => user.id === usuarioLogado);

  tbody.innerHTML = usuario.tarefas.map(tarefa => {
      return `<tr></tr>`;
  }).join('');

  usuario.tarefas.forEach(tarefa => {
      var novaLinha = table.insertRow();
      
      var colunaTarefa = novaLinha.insertCell(0);
      var colunaInicio = novaLinha.insertCell(1);
      var colunaTermino = novaLinha.insertCell(2);
      var colunaStatus = novaLinha.insertCell(3);
      var colunaEditar = novaLinha.insertCell(4);

      let inicioCombinado = combineDateTime(formatDate(tarefa.inicio), tarefa.horario_inicio);
      let terminoCombinado = combineDateTime(formatDate(tarefa.termino), tarefa.horario_termino);
      
      let statusTarefa  = getStatus(tarefa, inicioCombinado, terminoCombinado);

      colunaTarefa.innerHTML = `<button type="button" onclick="abrirModalDescricao(${tarefa.id})" class="btn-hidden ${statusTarefa.status}" data-bs-toggle="modal" data-bs-target="#modal-task-description-card" style="font">${tarefa.tarefa}</button>`;
      colunaInicio.textContent = formatDate(tarefa.inicio) + ' às ' + tarefa.horario_inicio;
      colunaTermino.textContent = formatDate(tarefa.termino) + ' às ' + tarefa.horario_termino;
      colunaStatus.innerHTML = `<button style="background-color: ${statusTarefa.color}" data-status="${statusTarefa.status}">${statusTarefa.status}</button>`;
      colunaEditar.innerHTML = `<button type="button" onclick="abrirModalEdicao(${tarefa.id})" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-task-edit-card">Alterar</button>`;
  });
}

// FORMATA DATA

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}
  
// COMBINA DATA E HORA

function combineDateTime(dateString, timeString) {
  // Create Date object from date and time strings
  const parts = dateString.split('/')
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is zero-based
  const year = parseInt(parts[2], 10);
  
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  
  const date = new Date(year, month, day, hours, minutes);
  return date; 
}

// STATUS DA TAREFA

function getStatus(tarefa, startDate, endDate) {
  const currentDate = new Date();
    
  if (tarefa.status == 'Realizada') {
    let status = "Realizada"
    let color = "rgb(114, 228, 114)";
    return {status, color};
  } else {
    if (endDate < currentDate) {
      let status = "Em atraso"
      let color = "rgb(226, 139, 139)";
      return {status, color};
    } else if (startDate <= currentDate && endDate >= currentDate) {
      let status = "Em andamento"
      let color = "transparent";
      return {status, color};
    } else {
      let status = "Pendente"
      let color = "rgb(255, 226, 172)";
      return {status, color};
    }
  }

}

// MODAL COM DESCRICAO

function abrirModalDescricao(tarefaId){
    const myModal = document.getElementById('modal-task-description-card');

    myModal.addEventListener('shown.bs.modal', () => {
        const modalTitulo = document.getElementById('modal-task-description-title');
        const modalDescricao = document.getElementById('modal-task-description-text');
        const modalRodape = document.getElementById('modal-task-description-footer');

        const jsonData = localStorage.getItem('dados.json');
        const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
        usuario = data.usuarios.find(user => user.id === usuarioLogado);
                
        const tarefaEncontrada = usuario.tarefas.find(tarefa => tarefa.id === tarefaId);
        modalTitulo.textContent = tarefaEncontrada.tarefa;
        modalDescricao.textContent = tarefaEncontrada.descricao;
        modalRodape.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                 <button type="button" class="btn btn-primary" onclick="abrirModalEdicao(${tarefaEncontrada.id})" data-bs-toggle="modal" data-bs-target="#modal-task-edit-card">Alterar</button>`
    })
}

// MODAL PARA EDICAO

function abrirModalEdicao(tarefaId){
    const myModal = document.getElementById('modal-task-edit-card');

    myModal.addEventListener('shown.bs.modal', () => {
        const jsonData = localStorage.getItem('dados.json');
        const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
        usuario = data.usuarios.find(user => user.id === usuarioLogado);
        
        const posicaoDaTarefa = usuario.tarefas.findIndex(tarefa => tarefa.id === tarefaId);
        const tarefaEncontrada = usuario.tarefas.find(tarefa => tarefa.id === tarefaId);

        let tarefa = document.getElementById('edit-task-nome');
        let inicioData = document.getElementById('edit-task-data-inicio');
        let inicioHorario = document.getElementById('edit-task-hora-inicio');
        let terminoData = document.getElementById('edit-task-data-termino');
        let terminoHorario = document.getElementById('edit-task-hora-termino');
        let descricao = document.getElementById('edit-task-descricao');

        tarefa.value = tarefaEncontrada.tarefa;
        inicioData.value = tarefaEncontrada.inicio;
        inicioHorario.value = tarefaEncontrada.horario_inicio;
        terminoData.value = tarefaEncontrada.termino;
        terminoHorario.value = tarefaEncontrada.horario_termino;
        descricao.value = tarefaEncontrada.descricao;
        
        const modalRodapeBtnAtualizar = document.getElementById('edit-new-task-button-update');
        const modalRodapeBtnApagar = document.getElementById('edit-new-task-button-delete');
        const modalRodapeBtnRealizar = document.getElementById('edit-new-task-button-finish');
        modalRodapeBtnRealizar.innerHTML = tarefaEncontrada.status === 'Realizada' ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"/></svg> <span style="color: green">Marcar como não realizada</span>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"/></svg> <span style="color: green">Marcar como realizada</span>`;

        modalRodapeBtnAtualizar.onclick = function atualizarTarefa() {
          tarefaEncontrada.tarefa = tarefa.value;
          tarefaEncontrada.inicio = inicioData.value;
          tarefaEncontrada.horario_inicio = inicioHorario.value;
          tarefaEncontrada.termino = terminoData.value;
          tarefaEncontrada.horario_termino = terminoHorario.value;
          tarefaEncontrada.descricao = descricao.value || "Não há descrição!";
          
          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela();
        };

        modalRodapeBtnApagar.onclick = function deletarTarefa() {
          usuario.tarefas.splice(posicaoDaTarefa, 1);
          
          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela();
        };
        
        modalRodapeBtnRealizar.onclick = function concluirTarefa() {
          tarefaEncontrada.status = tarefaEncontrada.status != 'Realizada' ? 'Realizada' : 'Pendente'

          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela();
        };
        
    })
}