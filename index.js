const express = require('express');
const app = express();
const PORT = 3000;

const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');

app.use(express.json());
app.use(express.static('public'));

app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});