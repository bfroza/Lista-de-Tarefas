### API para gerenciar uma lista de tarefas

#### Desenvolvido por Bruno Froza e Marcio Lima

#### Contato
- Email: 032758@aluno.uricer.edu.br
- Email: marciolima@uricer.edu.br

#### Licença
Apache 2.0 - Veja LICENSE para mais detalhes.

#### Endpoints

##### Adicionar Tarefa
- URL: /tasks/post
- Método: POST
- Resumo: Adiciona uma nova tarefa
- Request Body: application/json
- Respostas:
  - 201: Tarefa adicionada
  - 400: Requisição inválida
  - 500: Erro interno

##### Listar Tarefas
- URL: /tasks
- Método: GET
- Resumo: Lista todas as tarefas
- Respostas:
  - 200: Lista de tarefas
  - 500: Erro interno

##### Obter Tarefa por ID
- URL: /tasks/{id}
- Método: GET
- Resumo: Retorna uma tarefa por ID
- Parâmetro: id (integer, obrigatório)
- Respostas:
  - 200: Tarefa obtida
  - 404: Tarefa não encontrada
  - 500: Erro interno

##### Deletar Tarefa
- URL: /tasks/{id}
- Método: DELETE
- Resumo: Deleta uma tarefa
- Parâmetro: id (integer, obrigatório)
- Respostas:
  - 200: Tarefa deletada
  - 404: Tarefa não encontrada
  - 500: Erro interno

##### Atualizar Tarefa
- URL: /tasks/{id}
- Método: PUT
- Resumo: Atualiza uma tarefa
- Parâmetro: id (integer, obrigatório)
- Request Body: application/json
- Respostas:
  - 200: Tarefa atualizada
  - 400: Requisição inválida
  - 404: Tarefa não encontrada
  - 500: Erro interno

#### Componentes

##### Schemas

###### Task
```json
TaskInput

{
  "id": 1,
  "descricao": "Completar relatório",
  "criacao": "2024-05-12",
  "limite": "2024-05-30",
  "finalizada": false
}

TaskUpdate

{
  "descricao": "testee",
  "criacao": "2024-05-12",
  "limite": "2024-05-30",
  "finalizada": false
}

Error

{
  "descricao": "Fazer relatório diario",
  "criacao": "2024-05-23T12:15:46.376Z",
  "limite": "2024-05-30",
  "finalizada": true
}


{
  "message": "Descrição do erro"
}
```
### Como Rodar o Código

Para rodar este projeto em sua máquina local, siga estas etapas:

1. **Clone o repositório:** Abra o terminal e execute o seguinte comando:

   ```bash
   git clone https://github.com/bfroza/Lista-de-Tarefas.git

2. ** Instale o Java e o JDK na versão 22:
- Instale o IntelliJ IDEA.
- Baixe o Spring Boot 3.2.5.

3. ** Adicione as dependências:
- Spring Web
- Spring Data JPA
- H2Database

4. ** RUN:
- Entre no IntelliJ IDEA e execute a classe TarefaApplication.

5. **Visualização:

##### Clique no arquivo HTML para ter uma interface de visualização.
##### Ou instale o Postman e realize as requisições por URL:
- Para GET all: localhost:8080/tasks
- Para GET por ID: localhost:8080/tasks/1
- Para POST: localhost:8080/tasks/post
- Para DELETE: localhost:8080/tasks/5
- Para UPDATE: localhost:8080/tasks/5
