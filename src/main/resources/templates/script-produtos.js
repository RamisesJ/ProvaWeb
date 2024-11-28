const apiBaseUrl = "http://localhost:8080/produtos";

document
    .getElementById("produto-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("produto-id").value;
        const produto = {
            nome: document.getElementById("nome").value,
            codigo: document.getElementById("codigo").value,
            preco: document.getElementById("preco").value,
            descricao: document.getElementById("descricao").value,
            quantidade: document.getElementById("quantidade").value,
        };

        if (id) {
            await fetch(`${apiBaseUrl}/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(produto),
            });
        } else {
            await fetch(apiBaseUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(produto),
            });
        }

        resetForm();
        listarProdutos();
    });

async function listarProdutos() {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const produtos = await response.json();

        const produtoList = document.getElementById("produto-list");
        produtoList.innerHTML = "";
        produtos.forEach((produto) => {
            const item = document.createElement("tr");
            item.innerHTML = `
             <td>${produto.nome}</td>
            <td>${produto.codigo}</td>
            <td>${produto.preco.toFixed(2)}</td>
            <td>${produto.descricao || "-"}</td>
            <td>${produto.quantidade}</td>
            <td>
                <button onclick="editarProduto(${produto.id})">Editar</button>
                <button onclick="deletarProduto(${produto.id})">Remover</button>
            </td>
        `;
            produtoList.appendChild(item);
        });
    } catch (error) {
        console.log("Erro ao lista produtos", error);
    }
}

async function editarProduto(id) {
    const response = await fetch(`${apiBaseUrl}/${id}`);
    const produto = await response.json();

    document.getElementById("produto-id").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("quantidade").value = produto.quantidade;

    document.getElementById("cancelar").style.display = "inline-block";
}

async function deletarProduto(id) {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
        await fetch(`${apiBaseUrl}/${id}`, {method: "DELETE"});
        listarProdutos();
    }
}

function resetForm() {
    document.getElementById("produto-id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("cancelar").style.display = "none";
}

document.getElementById("cancelar").addEventListener("click", resetForm);

listarProdutos();
