function listarPersonagensInteracao(lista) {
  console.log(`\n🧑‍🤝‍🧑 Personagens disponíveis para interação:\n`);

  if (!lista || lista.length === 0) {
    console.log("😕 Nenhum personagem encontrado.");
    return;
  }

  lista.forEach((p, i) => {
    console.log(`[${i + 1}] - Nome: ${p.nome}`);
  });

  console.log("\n[X] - Voltar ao menu anterior");
}

function exibirMensagemSemPersonagens() {
  console.log("\n😕 Nenhum personagem encontrado.");
}

function exibirMensagemPersonagemEscolhido(nome) {
  console.log(`\n✨ Você escolheu interagir com: ${nome}`);
}

function exibirMensagemOpcaoInvalida() {
  console.log("\n❌ Opção inválida! Tente novamente.");
}

function exibirMenuInteracoes(tipo, interacoes) {
  console.log(`\n🎭 Interações do tipo: ${tipo}\n`);
  interacoes.forEach((i, idx) => {
    console.log(`[${idx + 1}] - ${i.interacao}`);
  });
  console.log("\n[X] - Voltar");
}

function exibirErroInteracoes() {
  console.log("\n⚠️ Ocorreu um erro ao tentar mostrar as interações.");
}

function exibirOpcaoInvalida() {
  console.log("\n❌ Opção inválida! Escolha outra.");
}

function exibirMenuTiposDeInteracao(personagem, relacao, opcoes) {
  console.log(`\n🔄 Interações com ${personagem.nome}\n`);
  console.log(`💬 Relação atual: ${emojiRelacao(relacao.tipo)} ${relacao.tipo} (${relacao.pontos} pontos)\n`);

  opcoes.forEach((tipo, i) => {
    console.log(`[${i + 1}] - ${tipo}`);
  });

  console.log("\n[X] - Voltar");
}

function emojiRelacao(tipo) {
  const mapa = {
    "INIMIZADE": "💔",
    "NEUTRO": "🌱",
    "AMIZADE": "🍻",
    "AMOR": "❤️‍🔥"
  };
  return mapa[tipo] || "";
}

export {
  listarPersonagensInteracao,
  exibirMensagemSemPersonagens,
  exibirMensagemPersonagemEscolhido,
  exibirMensagemOpcaoInvalida,
  exibirMenuInteracoes,
  exibirErroInteracoes,
  exibirOpcaoInvalida,
  exibirMenuTiposDeInteracao
};