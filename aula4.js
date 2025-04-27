let tesouros = [
    "Poneglyph de Zou",
    "Zoro (Se perdeu!)",
    "Poneglyph de Whole Cake Island",
    "Poneglyph de Wano",
    "Akuma no Mi"
  ];
  let posicoesTesouros = [2, 5, 6, 7, 9];
  let tesourosEncontrados = [];
  let tentativas = 0;
  let maxTentativas = 5;
  let posicoesChecadas = [];
  
  const fimDeJogo = document.getElementById("fimDeJogo");
  const imagemFinal = document.getElementById("imagemFinal");
  const jogarNovamenteBtn = document.getElementById("jogarNovamenteBtn");
  const desistirBtn = document.getElementById("desistirBtn");
  
  function iniciarJogo() {
    alert("Vamos atrás dos Poneglyphs para encontrar o One Piece! Você tem " + maxTentativas + " tentativas para encontrar os itens!");
    document.getElementById("jogo").style.display = "block";
    document.getElementById("iniciarJogoBtn").style.display = "none";
    fimDeJogo.style.display = "none";
  }
  
  function verificarPosicao() {
    let posicoesSelecionadas = [];
  
    document.querySelectorAll(".posicaoBtn.selected").forEach((button) => {
      posicoesSelecionadas.push(parseInt(button.getAttribute("data-value")));
    });
  
    if (posicoesSelecionadas.length === 0) {
      alert("Por favor, selecione pelo menos uma posição.");
      return;
    }
  
    if (posicoesSelecionadas.length > 5) {
      alert("Você só pode selecionar até 5 posições.");
      return;
    }
  
    posicoesSelecionadas.forEach((posicaoSelecionada) => {
      if (posicoesChecadas.includes(posicaoSelecionada)) {
        alert("Você já checou a posição " + posicaoSelecionada + ". Tente outra!");
      } else {
        posicoesChecadas.push(posicaoSelecionada);
        tentativas++;
  
        if (posicoesTesouros.includes(posicaoSelecionada)) {
          let indice = posicoesTesouros.indexOf(posicaoSelecionada);
          tesourosEncontrados.push(tesouros[indice]);
          alert("Parabéns! Você encontrou: " + tesouros[indice]);
        } else {
          alert("Não tem nada aqui. Tenta de novo!");
        }
      }
    });
  
    document.getElementById("logPosicoes").innerText =
      "Posições checadas: " + posicoesChecadas.join(", ");
  
    if (tentativas >= maxTentativas) {
      finalizarJogo();
    }
  }
  
  function finalizarJogo() {
    document.getElementById("jogo").style.display = "none";
    fimDeJogo.style.display = "block";
  
    if (tesourosEncontrados.length === posicoesTesouros.length) {
      imagemFinal.src = "https://files.catbox.moe/8iq7ci.jpg";
      alert("Você encontrou todos os Tesouros! Vitória dos Piratas do Chapéu de Palha!");
    } else {
      imagemFinal.src = "https://files.catbox.moe/pjq9z7.jpg";
      alert("Você não achou todos, tá perdido igual o Zoro! Agora você vai fazer parte do bando do Foxy.");
    }
  }
  
  function resetarJogo() {
    tesourosEncontrados = [];
    tentativas = 0;
    posicoesChecadas = [];
  
    document.querySelectorAll(".posicaoBtn").forEach(button => {
      button.classList.remove("selected");
    });
  
    document.getElementById("logPosicoes").innerText = "";
    fimDeJogo.style.display = "none";
    document.getElementById("jogo").style.display = "none";
    document.getElementById("iniciarJogoBtn").style.display = "block";
  }
  
  document.getElementById("iniciarJogoBtn").addEventListener("click", iniciarJogo);
  document.getElementById("verificarBtn").addEventListener("click", verificarPosicao);
  jogarNovamenteBtn.addEventListener("click", resetarJogo);
  desistirBtn.addEventListener("click", () => {
    if (confirm("Vai desistir mesmo? A aventura vai acabar!")) {
      resetarJogo();
    }
  });
  
  // Botão de música
  const musica = document.getElementById("musicaFundo");
  const musicaBtn = document.getElementById("musicaBtn");
  
  musicaBtn.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      musicaBtn.textContent = "🎵 Música: Pause";
    } else {
      musica.pause();
      musicaBtn.textContent = "🎵 Música: Play";
    }
  });
  
  // Botões de posição
  document.querySelectorAll(".posicaoBtn").forEach(button => {
    button.addEventListener("click", function () {
      this.classList.toggle("selected");
  
      const selecionados = document.querySelectorAll(".posicaoBtn.selected");
      if (selecionados.length > 5) {
        alert("Você só pode selecionar até 5 posições.");
        this.classList.remove("selected");
      }
    });
  });
  