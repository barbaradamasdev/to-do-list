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
