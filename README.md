#API para gerenciar uma lista de tarefas.

## Desenvolvido por Bruno Froza e Marcio Lima

### Contato
Email: 032758@aluno.uricer.edu.br
Email: marciolima@uricer.edu.br
Licença
Apache 2.0 - Veja LICENSE para mais detalhes.

###Endpoints
####Adicionar Tarefa
-URL: /tasks/post
-Método: POST
-Resumo: Adiciona uma nova tarefa
-Request Body: application/json
####Respostas:
-201: Tarefa adicionada
-400: Requisição inválida
-500: Erro interno
####Listar Tarefas
-URL: /tasks
-Método: GET
-Resumo: Lista todas as tarefas
-Respostas:
-200: Lista de tarefas
-500: Erro interno
####Obter Tarefa por ID
-URL: /tasks/{id}
-Método: GET
-Resumo: Retorna uma tarefa por ID
-Parâmetro: id (integer, obrigatório)
-Respostas:
-200: Tarefa obtida
-404: Tarefa não encontrada
-500: Erro interno
####Deletar Tarefa
-URL: /tasks/{id}
-Método: DELETE
-Resumo: Deleta uma tarefa
-Parâmetro: id (integer, obrigatório)
-Respostas:
-200: Tarefa deletada
-404: Tarefa não encontrada
-500: Erro interno
####Atualizar Tarefa
-URL: /tasks/{id}
-Método: PUT
-Resumo: Atualiza uma tarefa
-Parâmetro: id (integer, obrigatório)
-Request Body: application/json
-Respostas:
-200: Tarefa atualizada
-400: Requisição inválida
-404: Tarefa não encontrada
-500: Erro interno

####Componentes
####Schemas
####Task
#####json

{
  "id": 1,
  "descricao": "Completar relatório",
  "criacao": "2024-05-12",
  "limite": "2024-05-30",
  "finalizada": false
}
TaskInput
{
  "descricao": "testee",
  "criacao": "2024-05-12",
  "limite": "2024-05-30",
  "finalizada": false
}
TaskUpdate
{
  "descricao": "Fazer relatório diario",
  "criacao": "2024-05-23T12:15:46.376Z",
  "limite": "2024-05-30",
  "finalizada": true
}
Error
{
  "message": "Descrição do erro"
}
