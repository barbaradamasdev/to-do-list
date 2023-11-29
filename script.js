// Pega os dados do json e add na tabela
fetch('usuarios.json')
.then(arquivo => arquivo.json())
.then(arquivoJson => {
    arquivoJson.usuarios.forEach(function (usuario) {
        var tarefas = usuario.tarefas;
        tarefas.forEach(function (tarefa) {
            updateTable(usuario.nome, usuario.email, tarefa);
        });
    });
})
.catch(error => console.error('Error fetching data:', error));


// Adicionar a tarefa ao JSON e atualiza tabela
let novaTarefa = [];
let usuario = "john@example.com";

function addTarefa () {
    let task_nome = document.getElementById('task_nome').value;
    let task_data_inicio = document.getElementById('task_data_inicio').value;
    let task_hora_inicio = document.getElementById('task_hora_inicio').value;
    let task_data_termino = document.getElementById('task_data_termino').value;
    let task_hora_termino= document.getElementById('task_hora_termino').value;
    let task_descricao = document.getElementById('task_descricao').value;

    novaTarefa = [task_nome, task_data_inicio, task_hora_inicio, task_data_termino, task_hora_termino, task_descricao];
    console.log(novaTarefa);

    //userData.usuarios.
    updateTable(usuario.nome, usuario.email, tarefa);
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Atualizar tabela na insercao no html
function updateTable(nome, email, tarefa) {
    var table = document.getElementById('table');

    var novaLinha = table.insertRow();

    var colTarefa = novaLinha.insertCell(0);
    var colInicio = novaLinha.insertCell(1);
    var colTermino = novaLinha.insertCell(2);
    var colStatus = novaLinha.insertCell(3);
    var colEditar = novaLinha.insertCell(4);

    colTarefa.textContent = tarefa.tarefa;
    colInicio.textContent = formatDate(tarefa.inicio) + ' às ' + tarefa.horario_inicio;
    colTermino.textContent = formatDate(tarefa.termino) + ' às ' + tarefa.horario_termino;
    colStatus.textContent = tarefa.status;
    colEditar.innerHTML = '<button class="btn">Alterar</button>'
}