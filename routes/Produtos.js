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


router.post('/', (req, res) => {
    try {
        const produtos = lerProdutos();
        const { nome, preco, categoriaId } = req.body;

        if (!nome || preco === undefined) {
            return res.status(400).json({ erro: 'Nome e preço obrigatórios' });
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
    } catch {
        res.status(500).json({ erro: 'Erro ao cadastrar' });
    }
});


router.delete('/:id', (req, res) => {
    const produtos = lerProdutos();
    const novo = produtos.filter(p => p.id != req.params.id);

    if (novo.length === produtos.length) {
        return res.status(404).json({ erro: 'Não encontrado' });
    }

    salvarProdutos(novo);
    res.json({ mensagem: 'Removido' });
});

module.exports = router;