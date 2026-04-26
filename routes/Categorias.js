const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'categorias.json');

function lerCategorias() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function salvarCategorias(categorias) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(categorias, null, 2));
}

function gerarID(categorias) {
  if (categorias.length === 0) return 1;
  return Math.max(...categorias.map(c => c.id)) + 1;
}

router.get('/', (req, res) => {
  res.json(lerCategorias());
});

router.post('/', (req, res) => {
  const categorias = lerCategorias();
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome obrigatório' });
  }

  const nova = {
    id: gerarID(categorias),
    nome
  };

  categorias.push(nova);
  salvarCategorias(categorias);

  res.status(201).json(nova);
});

module.exports = router;