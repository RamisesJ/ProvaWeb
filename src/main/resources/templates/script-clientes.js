const apiBaseUrl = "http://localhost:8080/clientes";

async function listarClientes() {
  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const clientes = await response.json();

    const clienteList = document.getElementById("clientes-list");
    clienteList.innerHTML = "";
    clientes.forEach((cliente) => {
      const item = document.createElement("tr");
      item.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone || "-"}</td>
            <td>${cliente.endereco}</td>
            <td>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="deletarCliente(${cliente.id})">Remover</button>
            </td>
        `;
      clienteList.appendChild(item);
    });
  } catch (error) {
    console.log("Erro ao lista clientes", error);
  }
}

document
  .getElementById("cliente-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("cliente-id").value;
    const cliente = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      endereco: document.getElementById("endereco").value,
    };

    if (id) {
      await fetch(`${apiBaseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
    } else {
      await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
    }

    resetForm();
    listarClientes();
  });

async function editarCliente(id) {
  const response = await fetch(`${apiBaseUrl}/${id}`);
  const cliente = await response.json();

  document.getElementById("cliente-id").value = cliente.id;
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefone").value = cliente.telefone;
  document.getElementById("endereco").value = cliente.endereco;

  document.getElementById("cancelar").style.display = "inline-block";
}

async function deletarCliente(id) {
  if (confirm("Tem certeza que deseja deletar este cliente?")) {
    await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
    listarClientes();
  }
}

function resetForm() {
  document.getElementById("cliente-id").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("cancelar").style.display = "none";
}

document.getElementById("cancelar").addEventListener("click", resetForm);

listarClientes();
