const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'categorias.json');


function lerCategorias() {
    const conteudo = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(conteudo);
}

function salvarCategorias(categorias) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(categorias, null, 2), 'utf-8');
}


function gerarID(categorias) {
    if (categorias.length === 0) return 1;
    const maiorID = Math.max(...categorias.map(c => c.id));
    return maiorID + 1;
}

router.get('/', (req, res) => {
    try {
        const categorias = lerCategorias();
        res.json(categorias);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao ler categorias.'
        });
    }
});


router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const categorias = lerCategorias();
        const categoria = categorias.find(c => c.id === id);

        if (!categoria) {
            return res.status(404).json({
                erro: 'Categoria não encontrada.'
            });
        }

        res.json(categoria);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao buscar categoria.'
        });
    }
});


router.post('/', (req, res) => {
    try {
        const categorias = lerCategorias();
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                erro: 'Nome é obrigatório.'
            });
        }

        const novaCategoria = {
            id: gerarID(categorias),
            nome
        };

        categorias.push(novaCategoria);
        salvarCategorias(categorias);

        res.status(201).json(novaCategoria);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao cadastrar categoria.'
        });
    }
});


router.put('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const categorias = lerCategorias();

        const index = categorias.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({
                erro: 'Categoria não encontrada.'
            });
        }

        const { nome } = req.body;

        if (nome !== undefined) {
            categorias[index].nome = nome;
        }

        salvarCategorias(categorias);

        res.json(categorias[index]);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao atualizar categoria.'
        });
    }
});


router.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const categorias = lerCategorias();

        const index = categorias.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({
                erro: 'Categoria não encontrada.'
            });
        }

        categorias.splice(index, 1);
        salvarCategorias(categorias);

        res.json({
            mensagem: 'Categoria removida com sucesso.'
        });
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao remover categoria.'
        });
    }
});

module.exports = router;