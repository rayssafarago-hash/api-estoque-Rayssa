const API = "http://localhost:3000/produtos";

async function carregar() {
  const res = await fetch(API);
  const dados = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nome} - R$ ${p.preco} 
      <button onclick="deletar(${p.id})">X</button>`;
    lista.appendChild(li);
  });
}

async function criar() {
  const nome = document.getElementById("nome").value;
  const preco = Number(document.getElementById("preco").value);
  const categoriaId = Number(document.getElementById("categoria").value);

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, preco, categoriaId })
  });

  carregar();
}

async function deletar(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  carregar();
}

carregar();