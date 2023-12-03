# Gerenciador de Tarefas - SharpCoders
### Desafio Fast Track - Ima Tech: Gerenciador de Tarefas

Desenvolvimento de um sistema responsivo para gerenciamento de tarefas. O objetivo é aplicar conhecimentos do bootcamp para criar um sistema responsivo de gerenciamento de tarefas, seguindo diretrizes e wireframes.

![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/mockup-loginpage.png?raw=true)
[Live View do Projeto](https://main--aquamarine-haupia-cbf593.netlify.app/)

### 🎯 Tecnologias permitidas no projeto
|  |  |  |  |
| ------ | ------ | ------ | ------ |
| HTML | CSS | JavaScript | Bootstrap|
---
#### ❤️ Tela Final
| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/tela-login-desktop.png?raw=true)  Desktop| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/tela-login-mobile.png?raw=true) Mobile |
| --- | --- |

| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/userpage-desktop-alterar.png?raw=true) Desktop| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/userpage-mobile-alterar.png?raw=true) Mobile |
| --- | --- |

#### ✍🏻️ Wireframes para seguir

| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/Wireframe01.png?raw=true) | ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/Wireframe02.png?raw=true) |
| --- | --- |

| ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/Wireframe03.png?raw=true) | ![wireframe](https://github.com/barbaradamasdev/to-do-list/blob/main/wireframe/Wireframe04.png?raw=true) |
| --- | --- |
---

### ✍🏻️ Regras do desafio:
**Tela de login**:
- Imagem na esquerda
- Formulário de autenticação
- Formulário de cadastro

**Tela de gerenciar tarefa**:
- Formulario com: Título da tarefa, Data e horário de início, Data e horário de término, Descrição da tarefa
- Listagem das Tarefas com status indicando: Pendente, Em andamento, Realizada, Em Atraso
- Ao clicar na tarefa, abrir modal com a descrição.
- Botão para alterar tarefas com formulário preenchido automaticamente
- Botões para: Alterar tarefa, Remover tarefa, Marcar como realizada e Cancelar
- Tarefas realizadas têm botão Marcar como não realizada

**Barra Superior**
- Mensagem com nome do cliente
- Link para sair (retorna à página inicial com formulário de autenticação e criação de conta)

---
## 🚀 Implementações e comentários

### ⭐ Responsividade
O bootstrap já é focado em responsividade e para as implementações utilizando ele foi rápida, além disso fiz alguns breakpoints modificando manualmente no css puro.

### ⭐ Boostrap
Utilizei modal, formulário e alertas, sendo alguns ainda estilizados no CSS para complementar.

### ⭐ Root
Utilizei root no css para facilitar a padronização de cores e uso de variáveis.

```
:root {
  --font-bold: "Anton", sans-serif;
  --font-context-principal: "Roboto", sans-serif;
  --font-context-secondary: "Oswald", sans-serif;

  --pink01: #feede9;
  --pink02: #fdd8d3;
  --pink03: #f9bdbb;
  --pink04: #f3a8ad;
  --pink05: #eb8b9b;
  --pink06: #ca657f;
  --pink07: #a94669;
  --pink08: #882c55;
  --pink09: #701a49;
}
```
### ⭐ Data Placeholder
Para os inputs do tipo **date** e **time** utilizei o atributo html data para aparecer um placeholder e facilitar o entendimento do usuário sem precisar usar labels.

```
/* Data placeholder */
input[type="date"]::before,
input[type="time"]::before {
  content: attr(data-placeholder);
  color: rgba(92, 92, 92, 0.904);
  width: 100%;
}

input[type="date"]:focus::before,
input[type="date"]:valid::before,
input[type="time"]:focus::before,
input[type="time"]:valid::before {
  display: none;
}
```

### ⭐ Footer e animações
Incluí um footer com informações profissionais e uma animação alternativa ao footer na homepage utilizando keyframes.

---
## 📌 Tecnologias auxiliares
Para criação da marca utilizei:

| Tecnologia | Uso | Site |
| ------ | ------ | ------ |
| Notion | Documentação do projeto | www.notion.so/
| ChatGPT | Nomes de marca e slogan | chat.openai.com/
| Midjourney | Imagem de mascote |www.midjourney.com/
| Bing | Criação da logomarca  |www.bing.com/
| Eva Design System | Paleta de cores  | http://colors.eva.design/
| Photoshop | Criação do template e edição da logo |www.adobe.com/
| VSCode | Edição de código |code.visualstudio.com/
| Netlify | Deploy | https://www.netlify.com/

### 🚀 Deploy
O deploy deste projeto pode ser acessado na página abaixo:
[https://main--aquamarine-haupia-cbf593.netlify.app/](https://main--aquamarine-haupia-cbf593.netlify.app/)

### 🐼 Autora
Bárbara Damasceno
barbaradamas.dev@gmail.com
[Linkedin](https://www.linkedin.com/in/barbaradamascenodev)
[Portfolio](https://barbaradamasdev.github.io/portfolio/)
