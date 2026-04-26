const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'produtos.json');

function lerProdutos() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function salvarProdutos(produtos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2));
}

function gerarID(produtos) {
  if (produtos.length === 0) return 1;
  return Math.max(...produtos.map(p => p.id)) + 1;
}

router.get('/', (req, res) => {
  res.json(lerProdutos());
});

router.get('/:id', (req, res) => {
  const produtos = lerProdutos();
  const produto = produtos.find(p => p.id == req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json(produto);
});

router.post('/', (req, res) => {
  const produtos = lerProdutos();
  const { nome, preco, categoriaId } = req.body;
  
  if (!nome || nome.trim() === "" || preco === undefined || isNaN(preco) || preco <= 0) {
  return res.status(400).json({ erro: 'Nome e preço válidos são obrigatórios' });
}

  const novo = {
    id: gerarID(produtos),
    nome,
    preco,
    categoriaId: categoriaId || null
  };

  produtos.push(novo);
  salvarProdutos(produtos);

  res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
  const produtos = lerProdutos();
  const index = produtos.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  const { nome, preco, categoriaId } = req.body;

 if (!nome || nome.trim() === "" || preco === undefined || isNaN(preco) || preco <= 0) {
  return res.status(400).json({ erro: 'Nome e preço válidos são obrigatórios' });
}
  

  produtos[index] = {
    ...produtos[index],
    nome,
    preco,
    categoriaId
  };

  salvarProdutos(produtos);

  res.json(produtos[index]);
});

router.delete('/:id', (req, res) => {
  const produtos = lerProdutos();
  const novo = produtos.filter(p => p.id != req.params.id);

  if (novo.length === produtos.length) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  salvarProdutos(novo);
  res.json({ mensagem: 'Removido com sucesso' });
});

module.exports = router;