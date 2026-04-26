const express = require ('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const  DATA_FILE =path.join
(__dirname, '..', 'data', 'produtos.json');

    /**@returns {Array}*/

function lerProdutos() {
    const conteudo = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(conteudo);
}

/** @param {Array} lerProdutos*/

function salvarProdutos (produtos){
    fs.writeFileSync(DATA_FILE, JSON.stringify
        (produtos,null,2), 'utf-8');
}

/**
 * @param {Array} produtos
 * @returns {number}
  */

function gerarID(produtos){
    if (produtos.length ===0) return 1;
    const maiorID = Math.max(...produtos.map(p => p.id));
    return maiorID + 1;
}

router.get('/', (req,res) => {
    try{
        const produtos = lerProdutos();
        res.json(produtos);
    }catch (erro){
        res.status(500).json
        ({erro: 'Erro ao ler os dados do produtos.'})
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const produtos = lerProdutos();
        const produto = produtos.find(p => p.id === id);
   
        if (!produto){
            return res.status
                (404).json({ erro: 'Erro ao buscar o produto'})
        }
        res.json(produto);

    } catch (erro){
        res.status(500).json({erro: 'Erro ao buscar produto.'})
    }
});

router.post('/', (req, res) => {
    try {
        const produtos = lerProdutos();
        const { nome, descricao, preco, quantidade, categoriaid } = req.body;

        if (!nome || preco === undefined) {
            return res.status(400).json({
                erro: 'Nome e preco são obrigatórios.'
            });
        }

        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({
                erro: 'Preco deve ser maior que zero.'
            });
        }

        if (
            quantidade !== undefined &&
            (!Number.isInteger(quantidade) || quantidade < 0)
        ) {
            return res.status(400).json({
                erro: 'Quantidade deve ser um número inteiro maior ou igual a zero.'
            });
        }

        const novoProduto = {
            id: gerarID(produtos),
            nome,
            descricao: descricao || '',
            preco,
            quantidade: quantidade || 0,
            categoriaid: categoriaid || null
        };

        produtos.push(novoProduto);
        salvarProdutos(produtos);

        res.status(201).json(novoProduto);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao cadastrar produto.'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const produtos = lerProdutos();

        const index = produtos.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                erro: 'Produto não encontrado.'
            });
        }

        const { nome, descricao, preco, quantidade, categoriaid } = req.body;

        if (preco !== undefined && (typeof preco !== 'number' || preco <= 0)) {
            return res.status(400).json({
                erro: 'Preco deve ser maior que zero.'
            });
        }

        if (
            quantidade !== undefined &&
            (!Number.isInteger(quantidade) || quantidade < 0)
        ) {
            return res.status(400).json({
                erro: 'Quantidade deve ser um número inteiro maior ou igual a zero.'
            });
        }

        if (nome !== undefined) produtos[index].nome = nome;
        if (descricao !== undefined) produtos[index].descricao = descricao;
        if (preco !== undefined) produtos[index].preco = preco;
        if (quantidade !== undefined) produtos[index].quantidade = quantidade;
        if (categoriaid !== undefined) produtos[index].categoriaid = categoriaid;

        salvarProdutos(produtos);

        res.json(produtos[index]);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao atualizar produto.'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const produtos = lerProdutos();

        const index = produtos.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                erro: 'Produto não encontrado.'
            });
        }

        produtos.splice(index, 1);
        salvarProdutos(produtos);

        res.json({
            mensagem: 'Produto removido com sucesso.'
        });
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao remover produto.'
        });
    }
});


module.exports = router;