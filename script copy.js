let usuarioLogado;

// Funcao para logar usuario
function entrar(){
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;

  // Carregar JSON existente (se houver)
  const jsonData = localStorage.getItem('dados.json');
  const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };

  const usuario = data.usuarios.find(usuario => usuario.email === email);
  
  // Verificar se o usuário foi encontrado e a senha está correta
  if (usuario && usuario.password === password) {
    usuarioLogado = usuario.id;
    alert('Login bem-sucedido! Redirecionando...');
    setTimeout(function () {
      window.location.href = 'userPage.html';
  }, 1000);
  } else {
    alert('Email ou senha incorretos. Tente novamente.');
  }
}

// Funcao para cadastrar usuario
function cadastrar(){
    let nome = document.getElementById('input-nome').value;
    let email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;

    hashPassword(password);

    // Carregar JSON existente (se houver)
    const jsonData = localStorage.getItem('dados.json');
    const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };

    // Recuperar o valor atual do taskId do localStorage ou iniciar a partir de 0
    let userId = parseInt(localStorage.getItem('userId')) || 0;
    userId++;

    // Adicionar novos dados
    newUser = {
        id: userId,
        nome: nome,
        email: email,
        password: password,
        tarefas: []
    };

    data.usuarios.push(newUser);
  
    // Salvar dados atualizados
    localStorage.setItem('dados.json', JSON.stringify(data));
    localStorage.setItem('userId', userId);

    // Salvar dados do usuario logado
    usuarioLogado = newUser;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

     // Abrir alert e carregar pagina
    usuarioLogado = data.usuarios.newUser;
    alert("Cadastro realizado com sucesso! Redirecionando...");
    setTimeout(function () {
      window.location.href = 'userPage.html';
  }, 1000);
}

//Criptografar senha
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
}

// Carregar dados do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoJSON) {
        usuarioLogado = JSON.parse(usuarioLogadoJSON);
        // Atualizar a página com as informações do usuário, se necessário
        document.getElementById('nome-usuario').innerText = usuarioLogado.nome;

        // Carregar dados do localStorage ao carregar a página
        const jsonData = localStorage.getItem('dados.json');
        const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };

        // Encontrar o usuário pelo ID
        const usuario = data.usuarios.find(user => user.id === usuarioLogado.id);

        // Atualizar a tabela com os dados carregados
        atualizarTabela(usuario);
    } else {
      if (window.location.pathname !== '/index.html') {
        // Redirecionar para a página de login (index.html)
        window.location.href = 'index.html';
    }

    }
});


//Data inicial a partir de hoje
const today = new Date().toISOString().split('T')[0]; 
document.getElementById('task_data_inicio').setAttribute('min', today);

// Data final a partir da selecao da data inicial
document.getElementById('task_data_inicio').addEventListener('change', function() {
  document.getElementById('task_data_termino').removeAttribute('disabled');
  document.getElementById('task_data_termino').setAttribute('min', this.value);
});

document.getElementById('edit_task_data_inicio').setAttribute('min', today);

document.getElementById('edit_task_data_inicio').addEventListener('change', function() {
  document.getElementById('edit_task_data_termino').setAttribute('min', this.value);;
  document.getElementById('task_data_termino').setAttribute('min', this.value);
});
  
  function adicionarDadosAoJSON() {
    // Capturar dados do formulário
    let tarefa = document.getElementById('task_nome').value;
    let inicioInput = document.getElementById('task_data_inicio').value;
    let horarioInicioInput = document.getElementById('task_hora_inicio').value;
    let terminoInput = document.getElementById('task_data_termino').value;
    let horarioTerminoInput = document.getElementById('task_hora_termino').value;
    let descricao = document.getElementById('task_descricao').value;
    let status = 'Pendente';

    /* if (descricao.length <= 0) {
        descricao = "Não há descrição!";
    }

    if (inicioInput.length <= 0) {
        alert('Por favor, insira uma data válida para Data início.');
        return
    }

    if (horarioInicioInput.length <= 0) {
        alert('Por favor, insira uma hora válida para Hora início.');
        return
    }

    if (terminoInput.length <= 0) {
        alert('Por favor, insira uma data válida para Data término.');
        return
    }

    if (horarioTerminoInput.length <= 0) {
        alert('Por favor, insira uma hora válida para Hora término.');
        return
    } */

    // Carregar JSON existente (se houver)
    const jsonData = localStorage.getItem('dados.json');
    const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
    usuarioLogado = localStorage.getItem('usuarioLogado.json');
    console.log(usuarioLogado)
    const usuario = data.usuarios.find(user => user.id === usuarioLogado.id);
    console.log(usuario)

    // Recuperar o valor atual do taskId do localStorage ou iniciar a partir de 0
    let taskId = parseInt(localStorage.getItem('taskId')) || 0;
  
    taskId++;
    // Adicionar novos dados
    newTask = {
        id: taskId,
        tarefa: tarefa,
        inicio: inicioInput,
        horario_inicio: horarioInicioInput,
        termino: terminoInput,
        horario_termino: horarioTerminoInput,
        descricao: descricao,
        status: status
    };

    usuario.tarefas.push(newTask);
    console.log(usuario)
    console.log(usuario.tarefas)
  
    // Salvar dados atualizados
    localStorage.setItem('dados.json', JSON.stringify(data));
    localStorage.setItem('taskId', taskId);
  
    // Atualizar a tabela
    atualizarTabela(usuario);
  
    // Limpar formulário
    document.getElementById('taskForm').reset();
  }
  
  // Atualizar tabela
  function atualizarTabela(usuario) {
    var table = document.getElementById('table');
    const tbody = table.getElementsByTagName('tbody')[0];
  
    // Limpar conteúdo atual da tabela
    tbody.innerHTML = usuario.tarefas.map(tarefa => {
        return `<tr></tr>`;
        /* return `<tr id="tableTarefaNome">
        </tr>`; */
    }).join('');

    // Adicionar dados à tabela
    usuario.tarefas.forEach(tarefa => {
        var novaLinha = table.insertRow();
        novaLinha.id = `taskRow-${tarefa.id}`;

        var colTarefa = novaLinha.insertCell(0);
        var colInicio = novaLinha.insertCell(1);
        var colTermino = novaLinha.insertCell(2);
        var colStatus = novaLinha.insertCell(3);
        var colEditar = novaLinha.insertCell(4);

        let combinedInicio = combineDateTime(formatDate(tarefa.inicio), tarefa.horario_inicio);
        let combinedTermino = combineDateTime(formatDate(tarefa.termino), tarefa.horario_termino);
        
        let statusTarefa  = getStatus(tarefa, combinedInicio, combinedTermino);

        colTarefa.innerHTML = `<button type="button" onclick="abrirModalDescricao(${tarefa.id})" class="btn-hidden" data-bs-toggle="modal" data-bs-target="#modal-task-description-card" style="font">${tarefa.tarefa}</button>`;
        colInicio.textContent = formatDate(tarefa.inicio) + ' às ' + tarefa.horario_inicio;
        colTermino.textContent = formatDate(tarefa.termino) + ' às ' + tarefa.horario_termino;
        colStatus.innerHTML = `<button style="background-color: ${statusTarefa.color}" data-status="${statusTarefa.status}">${statusTarefa.status}</button>`;
        colEditar.innerHTML = `<button type="button" onclick="abrirModalEdicao(${tarefa.id})" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-task-edit-card">Alterar</button>`;
    });
  }

// Formata data
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}
  
// Juntar data e hora
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

// Retornar status
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

// Modal com descricao
function abrirModalDescricao(tarefaId){
    const myModal = document.getElementById('modal-task-description-card');

    myModal.addEventListener('shown.bs.modal', () => {
        const modalTitle = document.getElementById('modal-task-description-title');
        const modalDescription = document.getElementById('modal-task-description-text');

        const jsonData = localStorage.getItem('dados.json');
        const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
        const usuario = data ? JSON.parse(data) : { tarefas: [] };
        console.log(usuario)
                
        const tarefaEncontrada = usuario.tarefas.find(tarefa => tarefa.id === tarefaId);
        modalTitle.textContent = tarefaEncontrada.tarefa;
        modalDescription.textContent = tarefaEncontrada.descricao;
    })
}

// Modal para edicao
function abrirModalEdicao(tarefaId){
    const myModal = document.getElementById('modal-task-edit-card');

    myModal.addEventListener('shown.bs.modal', () => {
        const jsonData = localStorage.getItem('dados.json');
        const data = jsonData ? JSON.parse(jsonData) : { usuarios: [] };
        const usuario = data ? JSON.parse(data) : { tarefas: [] };
        console.log(usuario)
        
        const posicaoDaTarefa = usuario.tarefas.findIndex(tarefa => tarefa.id === tarefaId);
        const tarefaEncontrada = usuario.tarefas.find(tarefa => tarefa.id === tarefaId);

        let tarefa = document.getElementById('edit_task_nome');
        let inicioInput = document.getElementById('edit_task_data_inicio');
        let horarioInicioInput = document.getElementById('edit_task_hora_inicio');
        let terminoInput = document.getElementById('edit_task_data_termino');
        let horarioTerminoInput = document.getElementById('edit_task_hora_termino');
        let descricao = document.getElementById('edit_task_descricao');

        tarefa.value = tarefaEncontrada.tarefa;
        inicioInput.value = tarefaEncontrada.inicio;
        horarioInicioInput.value = tarefaEncontrada.horario_inicio;
        terminoInput.value = tarefaEncontrada.termino;
        horarioTerminoInput.value = tarefaEncontrada.horario_termino;
        descricao.value = tarefaEncontrada.descricao;
        
        const modalFooterBtnUpdate = document.getElementById('edit_new_task_button_update');
        const modalFooterBtnDelete = document.getElementById('edit_new_task_button_delete');
        const modalFooterBtnFinish = document.getElementById('edit_new_task_button_finish');
        modalFooterBtnFinish.innerHTML = tarefaEncontrada.status === 'Realizada' ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"/></svg> <span style="color: green">Marcar como não realizada</span>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"/></svg> <span style="color: green">Marcar como realizada</span>`;

        // Atualizar tarefa
        modalFooterBtnUpdate.onclick = function atualizarTarefa() {
          tarefaEncontrada.tarefa = tarefa.value;
          tarefaEncontrada.inicio = inicioInput.value;
          tarefaEncontrada.horario_inicio = horarioInicioInput.value;
          tarefaEncontrada.termino = terminoInput.value;
          tarefaEncontrada.horario_termino = horarioTerminoInput.value;
          tarefaEncontrada.descricao = descricao.value || "Não há descrição!";
          
          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela(data);
        };

        
        // Apagar tarefa
        modalFooterBtnDelete.onclick = function deletarTarefa() {
          usuario.tarefas.splice(posicaoDaTarefa, 1);
          
          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela(data);
        };
        
        // Concluir tarefa
        modalFooterBtnFinish.onclick = function concluirTarefa() {
          tarefaEncontrada.status = tarefaEncontrada.status != 'Realizada' ? 'Realizada' : 'Pendente'

          const taskRow = document.getElementById(`taskRow-${tarefaEncontrada.id}`);

          if (taskRow) {
            // Toggle the text-decoration style
            taskRow.style.textDecoration = tarefaEncontrada.status === 'Realizada' ? 'line-through' : 'none';
          }
          //'text-decoration: line-through';

          localStorage.setItem('dados.json', JSON.stringify(data));
          atualizarTabela(data);
        };
        
    })
}