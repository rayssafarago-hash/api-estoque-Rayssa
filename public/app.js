const API = "/produtos";

async function carregar() {
  const res = await fetch(API);
  const dados = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ID: ${p.id} | ${p.nome} - R$ ${p.preco} 
      | Categoria: ${p.categoriaId || "Sem categoria"}
      <button onclick="deletar(${p.id})">X</button>
    `;
    lista.appendChild(li);
  });
}


async function carregarCategorias() {
  const res = await fetch("/categorias");
  const categorias = await res.json();

  const select = document.getElementById("categoria");
  select.innerHTML = '<option value="">Selecione</option>';

  categorias.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.nome;
    select.appendChild(option);
  });
}

async function criar() {const nomeInput = document.getElementById("nome").value;
const precoInput = document.getElementById("preco").value;

const nome = nomeInput.trim();
const preco = Number(precoInput);

if (!nome || precoInput.trim() === "" || isNaN(preco)) {
  alert("Preencha nome e preço corretamente!");
  return;
}
  

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, preco, categoriaId })
    });

    const dados = await res.json();

    if (!res.ok) {
      alert(dados.erro);
      return;
    }

    alert("Produto cadastrado!");
    carregar();

  } catch (err) {
    alert("Erro ao conectar com o servidor");
  }
}

async function deletar(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const dados = await res.json();
    alert(dados.erro);
    return;
  }

  carregar();
}

async function buscarPorId() {
  const id = document.getElementById("buscarId").value;

  if (!id) {
    alert("Digite um ID");
    return;
  }

  const res = await fetch(`/produtos/${id}`);
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (!res.ok) {
  const dados = await res.json();
  lista.innerHTML = `<li>${dados.erro}</li>`;
  return;
}

  const p = await res.json();

  lista.innerHTML = `
    <li>
      ID: ${p.id} | ${p.nome} - R$ ${p.preco}
    </li>
  `;
}


carregar();
carregarCategorias();