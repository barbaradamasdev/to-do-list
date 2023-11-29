let id = 0;
let novaTarefa = [];

function addTarefa () {
    id++
    let task_nome = document.getElementById('task_nome');
    let task_data_inicio = document.getElementById('task_data_inicio');
    let task_hora_inicio = document.getElementById('task_hora_inicio');
    let task_data_termino = document.getElementById('task_data_termino');
    let task_hora_termino= document.getElementById('task_hora_termino');
    let task_descricao = document.getElementById('task_descricao');

    novaTarefa = [task_nome, task_data_inicio, task_hora_inicio, task_data_termino, task_hora_termino, task_descricao];
    console.table(novaTarefa);
}