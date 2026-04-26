API Lojinha - Projeto Full Stack

Projeto desenvolvido para a disciplina de Backend com o objetivo de criar uma aplicação Full Stack* utilizando Node.js + Express + HTML/CSS + Fetch API.

Descrição
A aplicação simula uma lojinha virtual, permitindo o gerenciamento de:

Produtos
Categorias

Os dados são armazenados em arquivos .json.


Tecnologias Utilizadas

* Node.js
* Express
* HTML5
* CSS3
* JavaScript (Fetch API)

---

Estrutura do Projeto

meu-projeto/
├── index.js
├── routes/
│   ├── produtos.js
│   └── categorias.js
├── data/
│   ├── produtos.json
│   └── categorias.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── .gitignore
└── README.md



Como Executar o Projeto

1. Clonar o repositório


git clone https://github.com/rayssafarago-hash/api-estoque-Rayssa.git


2. Entrar na pasta
cd api-estoque-Rayssa


3. Instalar dependências
npm install express

4. Rodar o servidor
node index.js

5. Acessar no navegador
http://localhost:3000



Produtos

| Método | Rota          | Descrição         |
| ------ | ------------- | ----------------- |
| GET    | /produtos     | Listar todos      |
| GET    | /produtos/:id | Buscar por ID     |
| POST   | /produtos     | Criar produto     |
| PUT    | /produtos/:id | Atualizar produto |
| DELETE | /produtos/:id | Remover produto   |

---
Validações

A API possui validações obrigatórias:

* Nome não pode ser vazio
* Preço deve ser numérico 
* Retorna erro `400` em caso de dados inválidos
* Retorna `404` quando não encontra registro

---

Front-End

O front-end foi desenvolvido com:

* HTML
* CSS
* JavaScript
---

Funcionalidades:

* Listar produtos
* Cadastrar produto
* Deletar produto
* Buscar por ID

---

Conceitos Aplicados

* API REST
* CRUD completo
* Manipulação de arquivos com `fs`
* Uso de `fetch` no front-end
* Integração front + back
* Organização em rotas

---

Autor

* Rayssa Farago

---

Observações

Projeto desenvolvido para fins educacionais como avaliação prática de desenvolvimento Full Stack.

---

Status

Finalizado
Funcional
Atende aos requisitos do trabalho

---
