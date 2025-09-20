 const estoqueCarros = {
    onix:{cor: "Preto", quantidadeInicial: 10,quantidade:10, estoqueMinimo: 30}, 
    tracker:{cor: "Preto", quantidadeInicial: 10,quantidade:10, estoqueMinimo: 30},
    onixPlus:{cor: "Preto", quantidadeInicial: 10,quantidade:10, estoqueMinimo: 30},
    s10:{cor: "Preto", quantidadeInicial: 10,quantidade:10, estoqueMinimo: 30}, 
    spin:{cor: "Preto", quantidadeInicial: 10,quantidade:10, estoqueMinimo: 30}
 };
function verificarEstoque(modelo){
    const carro = estoqueCarros[modelo];
    const minimo = carro.quantidadeInicial * (carro.estoqueMinimo / 100);

    if(carro.quantidade <= minimo){
        mostrarMensagem(`Estoque de ${modelo} atingiu 30% do estoque inicial. Reponha!`,"alerta");
    }
}
function mostrarMensagem(texto, tipo) {
  const mensagens = document.getElementById("mensagens"); 
  const p = document.createElement("p");
  p.textContent = texto;

  if (tipo === "alerta") {
    p.style.color = "red";
    p.style.fontWeight = "bold";
  } else {
    p.style.color = "green";
  }

  mensagens.appendChild(p);
}

function retirar(){
    const modelo = document.getElementById("modelo").value;
    const qtda = parseInt(document.getElementById("quantidade").value);
    estoqueCarros[modelo].quantidade -= qtda;
    if(estoqueCarros[modelo].quantidade < 0){
        estoqueCarros[modelo].quantidade = 0;
    }
    mostrarMensagem(`foram retirados ${qtda} ${modelo}(s). Estoque atual: ${estoqueCarros[modelo].quantidade}`,"ok");

    verificarEstoque(modelo);
    atualizarTabela();
}


function repor(){
    const modelo = document.getElementById("modelo").value;
    const qtda = parseInt(document.getElementById("quantidade").value);
    estoqueCarros[modelo].quantidade += qtda;
   
    mostrarMensagem(`Foram adicionados ${qtda} ${modelo}(s). Estoque atual: ${estoqueCarros[modelo].quantidade}`, "ok");

    atualizarTabela();
}

function atualizarTabela() {
    const tbody = document.getElementById("tabela-estoque").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    for (const modelo in estoqueCarros) {
        const carro = estoqueCarros[modelo];

        const tr = document.createElement("tr");

        const tdModelo = document.createElement("td");
        tdModelo.textContent = modelo;
        tr.appendChild(tdModelo);

        const tdCor = document.createElement("td");
        tdCor.textContent = carro.cor;
        tr.appendChild(tdCor);

        const tdQuantidade = document.createElement("td");
        tdQuantidade.textContent = carro.quantidade;
        tr.appendChild(tdQuantidade);

        // Cor da linha conforme estoque
        if (carro.quantidade <= (carro.quantidadeInicial * (carro.estoqueMinimo / 100))) {
            tr.style.backgroundColor = "#f8d7da"; // vermelho
        } else {
            tr.style.backgroundColor = "#d4edda"; // verde
        }

        tbody.appendChild(tr);
    }
}

