// ===== Script compartilhado por todas as páginas =====
// Protótipo: os dados abaixo são apenas de exemplo (sem back-end).
// As alterações feitas na tela valem só enquanto a página está aberta.

// ----- Dados de exemplo -----
var drones = [
  { id: 1, nome: "Drone Alfa", consumo: 5, velocidade: 10, bateria: 200 },
  { id: 2, nome: "Drone Beta", consumo: 8, velocidade: 15, bateria: 350 }
];

var mapas = [
  {
    id: 1,
    nome: "Fazenda Norte",
    carga: { x: 0, y: 0 },
    pontos: [
      { x: 10, y: 20 },
      { x: 30, y: 15 },
      { x: 40, y: 40 },
      { x: 15, y: 45 }
    ]
  },
  {
    id: 2,
    nome: "Sítio Leste",
    carga: { x: 5, y: 5 },
    pontos: [
      { x: 20, y: 10 },
      { x: 35, y: 30 }
    ]
  }
];

// Cada perna guarda a sequência de pontos visitados (índices em mapa.pontos).
// Valores de consumo são ilustrativos (dados de demonstração).
var missoes = [
  {
    id: 1,
    droneId: 1,
    mapaId: 1,
    consumoTotal: 185,
    pernas: [[0, 1], [2, 3]]
  },
  {
    id: 2,
    droneId: 2,
    mapaId: 2,
    consumoTotal: 120,
    pernas: [[0, 1]]
  }
];

// ----- Funções auxiliares -----
function buscarPorId(lista, id) {
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      return lista[i];
    }
  }
  return null;
}

function proximoId(lista) {
  var maior = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id > maior) {
      maior = lista[i].id;
    }
  }
  return maior + 1;
}

// Lê o valor de "?id=3" na URL
function lerIdDaUrl() {
  var partes = location.search.split("=");
  return partes[1];
}

// ----- Menu: marca o link da página atual -----
function marcarMenuAtivo() {
  var links = document.querySelectorAll("nav a");
  var pagina = location.pathname.split("/").pop();
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") == pagina) {
      links[i].setAttribute("aria-current", "page");
    }
  }
}

// ----- Desenho do plano cartesiano em SVG -----
// svgId: id do <svg>; mapa: objeto do mapa; pernas: lista de pernas (opcional)
function desenharMapa(svgId, mapa, pernas) {
  var svg = document.getElementById(svgId);
  var tamanho = 300;
  var margem = 25;

  // Descobre a maior coordenada para calcular a escala
  var maximo = mapa.carga.x;
  if (mapa.carga.y > maximo) {
    maximo = mapa.carga.y;
  }
  for (var i = 0; i < mapa.pontos.length; i++) {
    if (mapa.pontos[i].x > maximo) maximo = mapa.pontos[i].x;
    if (mapa.pontos[i].y > maximo) maximo = mapa.pontos[i].y;
  }
  if (maximo < 1) {
    maximo = 1;
  }
  var escala = (tamanho - 2 * margem) / maximo;

  // Converte coordenada do mapa em posição na tela (y é invertido)
  function posX(x) {
    return margem + x * escala;
  }
  function posY(y) {
    return tamanho - margem - y * escala;
  }

  var desenho = "";

  // Eixos
  desenho += '<line x1="' + margem + '" y1="' + (tamanho - margem) + '" x2="' + (tamanho - 5) + '" y2="' + (tamanho - margem) + '" stroke="#555" />';
  desenho += '<line x1="' + margem + '" y1="' + (tamanho - margem) + '" x2="' + margem + '" y2="5" stroke="#555" />';
  desenho += '<text x="' + (tamanho - 15) + '" y="' + (tamanho - 8) + '" font-size="12">x</text>';
  desenho += '<text x="8" y="15" font-size="12">y</text>';

  // Pernas da rota (cada perna: carga -> pontos -> carga)
  var cores = ["#d81b60", "#1e88e5", "#fb8c00", "#6d4c41"];
  if (pernas) {
    for (var p = 0; p < pernas.length; p++) {
      var cor = cores[p % cores.length];
      var anterior = mapa.carga;
      var sequencia = pernas[p].slice();
      sequencia.push(-1); // -1 representa a volta ao ponto de carregamento
      for (var s = 0; s < sequencia.length; s++) {
        var destino = mapa.carga;
        if (sequencia[s] >= 0) {
          destino = mapa.pontos[sequencia[s]];
        }
        desenho += '<line x1="' + posX(anterior.x) + '" y1="' + posY(anterior.y) + '" x2="' + posX(destino.x) + '" y2="' + posY(destino.y) + '" stroke="' + cor + '" stroke-width="2" />';
        anterior = destino;
      }
    }
  }

  // Pontos de irrigação (círculos azuis, numerados a partir de 1)
  for (var j = 0; j < mapa.pontos.length; j++) {
    desenho += '<circle cx="' + posX(mapa.pontos[j].x) + '" cy="' + posY(mapa.pontos[j].y) + '" r="5" fill="#0277bd" />';
    desenho += '<text x="' + (posX(mapa.pontos[j].x) + 7) + '" y="' + (posY(mapa.pontos[j].y) - 5) + '" font-size="11">' + (j + 1) + '</text>';
  }

  // Ponto de carregamento (quadrado vermelho)
  desenho += '<rect x="' + (posX(mapa.carga.x) - 6) + '" y="' + (posY(mapa.carga.y) - 6) + '" width="12" height="12" fill="#c62828" />';

  svg.innerHTML = desenho;
}

// ===== Página de login / cadastro =====
function iniciarLogin() {
  var formLogin = document.getElementById("form-login");
  var formCadastro = document.getElementById("form-cadastro");
  if (formLogin == null) {
    return;
  }

  document.getElementById("mostrar-cadastro").addEventListener("click", function () {
    formLogin.style.display = "none";
    formCadastro.style.display = "block";
  });
  document.getElementById("mostrar-login").addEventListener("click", function () {
    formCadastro.style.display = "none";
    formLogin.style.display = "block";
  });

  // Sem back-end: apenas segue para a próxima tela
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    location.href = "drones.html";
  });

  formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var senha = document.getElementById("cad-senha").value;
    var confirmar = document.getElementById("cad-confirmar").value;
    if (senha != confirmar) {
      document.getElementById("erro-cadastro").textContent = "As senhas não são iguais.";
      return;
    }
    location.href = "drones.html";
  });
}

// ===== Página de drones =====
function iniciarDrones() {
  var corpo = document.getElementById("corpo-drones");
  if (corpo == null) {
    return;
  }
  var form = document.getElementById("form-drone");
  var editando = null; // id do drone em edição

  function mostrarLista() {
    var html = "";
    for (var i = 0; i < drones.length; i++) {
      var d = drones[i];
      html += "<tr>";
      html += "<td>" + d.nome + "</td>";
      html += "<td>" + d.consumo + "</td>";
      html += "<td>" + d.velocidade + "</td>";
      html += "<td>" + d.bateria + "</td>";
      html += '<td><button onclick="editarDrone(' + d.id + ')">Editar</button> ';
      html += '<button class="perigo" onclick="removerDrone(' + d.id + ')">Remover</button></td>';
      html += "</tr>";
    }
    corpo.innerHTML = html;
  }

  window.editarDrone = function (id) {
    var d = buscarPorId(drones, id);
    document.getElementById("drone-nome").value = d.nome;
    document.getElementById("drone-consumo").value = d.consumo;
    document.getElementById("drone-velocidade").value = d.velocidade;
    document.getElementById("drone-bateria").value = d.bateria;
    document.getElementById("titulo-form-drone").textContent = "Editar drone";
    editando = id;
  };

  window.removerDrone = function (id) {
    if (confirm("Remover este drone?")) {
      var novaLista = [];
      for (var i = 0; i < drones.length; i++) {
        if (drones[i].id != id) {
          novaLista.push(drones[i]);
        }
      }
      drones = novaLista;
      mostrarLista();
    }
  };

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var nome = document.getElementById("drone-nome").value;
    var consumo = Number(document.getElementById("drone-consumo").value);
    var velocidade = Number(document.getElementById("drone-velocidade").value);
    var bateria = Number(document.getElementById("drone-bateria").value);
    var erro = document.getElementById("erro-drone");

    // Regra do F0: valores sempre positivos
    if (consumo <= 0 || velocidade <= 0 || bateria <= 0) {
      erro.textContent = "Consumo, velocidade e bateria devem ser maiores que zero.";
      return;
    }
    erro.textContent = "";

    if (editando == null) {
      drones.push({ id: proximoId(drones), nome: nome, consumo: consumo, velocidade: velocidade, bateria: bateria });
    } else {
      var d = buscarPorId(drones, editando);
      d.nome = nome;
      d.consumo = consumo;
      d.velocidade = velocidade;
      d.bateria = bateria;
      editando = null;
      document.getElementById("titulo-form-drone").textContent = "Novo drone";
    }
    form.reset();
    mostrarLista();
  });

  mostrarLista();
}

// ===== Página de mapas =====
function iniciarMapas() {
  var corpo = document.getElementById("corpo-mapas");
  if (corpo == null) {
    return;
  }
  var form = document.getElementById("form-mapa");
  var erro = document.getElementById("erro-mapa");
  var editando = null;
  var pontosAtuais = []; // pontos de irrigação do mapa em edição

  function mostrarLista() {
    var html = "";
    for (var i = 0; i < mapas.length; i++) {
      var m = mapas[i];
      html += "<tr>";
      html += "<td>" + m.nome + "</td>";
      html += "<td>(" + m.carga.x + ", " + m.carga.y + ")</td>";
      html += "<td>" + m.pontos.length + "</td>";
      html += '<td><button onclick="editarMapa(' + m.id + ')">Editar</button> ';
      html += '<button class="perigo" onclick="removerMapa(' + m.id + ')">Remover</button></td>';
      html += "</tr>";
    }
    corpo.innerHTML = html;
  }

  // Mostra a lista de pontos do formulário e redesenha o gráfico
  function mostrarPontos() {
    var html = "";
    for (var i = 0; i < pontosAtuais.length; i++) {
      html += "<li>Ponto " + (i + 1) + ": (" + pontosAtuais[i].x + ", " + pontosAtuais[i].y + ") ";
      html += '<button type="button" class="perigo" onclick="removerPonto(' + i + ')">Remover</button></li>';
    }
    document.getElementById("lista-pontos").innerHTML = html;

    var carga = {
      x: Number(document.getElementById("mapa-carga-x").value),
      y: Number(document.getElementById("mapa-carga-y").value)
    };
    desenharMapa("grafico-mapa", { carga: carga, pontos: pontosAtuais });
  }

  window.editarMapa = function (id) {
    var m = buscarPorId(mapas, id);
    document.getElementById("mapa-nome").value = m.nome;
    document.getElementById("mapa-carga-x").value = m.carga.x;
    document.getElementById("mapa-carga-y").value = m.carga.y;
    pontosAtuais = m.pontos.slice();
    document.getElementById("titulo-form-mapa").textContent = "Editar mapa";
    editando = id;
    mostrarPontos();
  };

  window.removerMapa = function (id) {
    if (confirm("Remover este mapa?")) {
      var novaLista = [];
      for (var i = 0; i < mapas.length; i++) {
        if (mapas[i].id != id) {
          novaLista.push(mapas[i]);
        }
      }
      mapas = novaLista;
      mostrarLista();
    }
  };

  window.removerPonto = function (posicao) {
    pontosAtuais.splice(posicao, 1);
    mostrarPontos();
  };

  // Verifica se a coordenada já existe (nenhuma coordenada pode se repetir)
  function coordenadaExiste(x, y) {
    var cx = Number(document.getElementById("mapa-carga-x").value);
    var cy = Number(document.getElementById("mapa-carga-y").value);
    if (x == cx && y == cy) {
      return true;
    }
    for (var i = 0; i < pontosAtuais.length; i++) {
      if (pontosAtuais[i].x == x && pontosAtuais[i].y == y) {
        return true;
      }
    }
    return false;
  }

  document.getElementById("botao-ponto").addEventListener("click", function () {
    var x = Number(document.getElementById("ponto-x").value);
    var y = Number(document.getElementById("ponto-y").value);
    if (document.getElementById("ponto-x").value == "" || document.getElementById("ponto-y").value == "") {
      erro.textContent = "Informe x e y do ponto.";
      return;
    }
    if (pontosAtuais.length >= 1000) {
      erro.textContent = "Um mapa pode ter no máximo 1000 pontos.";
      return;
    }
    if (coordenadaExiste(x, y)) {
      erro.textContent = "Essa coordenada já existe neste mapa.";
      return;
    }
    erro.textContent = "";
    pontosAtuais.push({ x: x, y: y });
    document.getElementById("ponto-x").value = "";
    document.getElementById("ponto-y").value = "";
    mostrarPontos();
  });

  document.getElementById("mapa-carga-x").addEventListener("input", mostrarPontos);
  document.getElementById("mapa-carga-y").addEventListener("input", mostrarPontos);

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var nome = document.getElementById("mapa-nome").value;
    var carga = {
      x: Number(document.getElementById("mapa-carga-x").value),
      y: Number(document.getElementById("mapa-carga-y").value)
    };

    // Regra do F0: de 1 a 1000 pontos de irrigação
    if (pontosAtuais.length < 1) {
      erro.textContent = "Adicione pelo menos 1 ponto de irrigação.";
      return;
    }
    erro.textContent = "";

    if (editando == null) {
      mapas.push({ id: proximoId(mapas), nome: nome, carga: carga, pontos: pontosAtuais });
    } else {
      var m = buscarPorId(mapas, editando);
      m.nome = nome;
      m.carga = carga;
      m.pontos = pontosAtuais;
      editando = null;
      document.getElementById("titulo-form-mapa").textContent = "Novo mapa";
    }
    form.reset();
    pontosAtuais = [];
    mostrarLista();
    mostrarPontos();
  });

  mostrarLista();
  mostrarPontos();
}

// ===== Página de missões =====
function iniciarMissoes() {
  var corpo = document.getElementById("corpo-missoes");
  if (corpo == null) {
    return;
  }

  function mostrarLista() {
    var html = "";
    for (var i = 0; i < missoes.length; i++) {
      var ms = missoes[i];
      html += "<tr>";
      html += "<td>" + buscarPorId(drones, ms.droneId).nome + "</td>";
      html += "<td>" + buscarPorId(mapas, ms.mapaId).nome + "</td>";
      html += "<td>" + ms.pernas.length + "</td>";
      html += "<td>" + ms.consumoTotal + "</td>";
      html += '<td><a class="botao" href="missao-detalhe.html?id=' + ms.id + '">Ver detalhe</a></td>';
      html += "</tr>";
    }
    corpo.innerHTML = html;
  }

  // Preenche os <select> com drones e mapas
  var opcoesDrones = "";
  for (var i = 0; i < drones.length; i++) {
    opcoesDrones += '<option value="' + drones[i].id + '">' + drones[i].nome + "</option>";
  }
  document.getElementById("select-drone").innerHTML = opcoesDrones;

  var opcoesMapas = "";
  for (var j = 0; j < mapas.length; j++) {
    opcoesMapas += '<option value="' + mapas[j].id + '">' + mapas[j].nome + "</option>";
  }
  document.getElementById("select-mapa").innerHTML = opcoesMapas;

  document.getElementById("form-missao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    var droneId = document.getElementById("select-drone").value;
    var mapaId = document.getElementById("select-mapa").value;
    var aviso = document.getElementById("aviso-missao");

    // Se o par já foi calculado, reaproveita o resultado (regra do F0)
    for (var k = 0; k < missoes.length; k++) {
      if (missoes[k].droneId == droneId && missoes[k].mapaId == mapaId) {
        aviso.innerHTML = 'Este par já foi calculado. <a href="missao-detalhe.html?id=' + missoes[k].id + '">Abrir resultado</a>.';
        return;
      }
    }
    aviso.textContent = "Cálculo de rota indisponível neste protótipo (depende do back-end). Veja as missões de exemplo na lista.";
  });

  mostrarLista();
}

// ===== Página de detalhe da missão =====
function iniciarDetalhe() {
  var area = document.getElementById("resumo-missao");
  if (area == null) {
    return;
  }
  var missao = buscarPorId(missoes, lerIdDaUrl());
  if (missao == null) {
    area.textContent = "Missão não encontrada.";
    return;
  }
  var drone = buscarPorId(drones, missao.droneId);
  var mapa = buscarPorId(mapas, missao.mapaId);

  area.innerHTML = "<p>Drone: <strong>" + drone.nome + "</strong></p>" +
    "<p>Mapa: <strong>" + mapa.nome + "</strong></p>" +
    "<p>Consumo energético total: <strong>" + missao.consumoTotal + "</strong></p>";

  var html = "";
  for (var i = 0; i < missao.pernas.length; i++) {
    html += "<li>Perna " + (i + 1) + ": Carga";
    for (var j = 0; j < missao.pernas[i].length; j++) {
      html += " → Ponto " + (missao.pernas[i][j] + 1);
    }
    html += " → Carga</li>";
  }
  document.getElementById("lista-pernas").innerHTML = html;

  desenharMapa("grafico-missao", mapa, missao.pernas);
}

// ----- Inicialização: cada função só age se a página tiver os elementos dela -----
marcarMenuAtivo();
iniciarLogin();
iniciarDrones();
iniciarMapas();
iniciarMissoes();
iniciarDetalhe();
