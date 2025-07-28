// Arquivo criado por Gabriel

import { getPersonagemAtual } from "../context/gerenciadorPersonagem";
import { verificarSerionidade } from "./executarAcoes";

function exibirInfoPersonagem() {
  const personagem = getPersonagemAtual();

  if (!personagem) {
    return console.log("Nenhum personagem encontrado!");
  }

  const {
    nome,
    tempoDeVida,
    energia,
    higiene,
    cresceleons,
    aspiracao,
    pontosDeHabilidade = {},
    itens = []
  } = personagem;

  console.log(`
=================================
👋 Olá! Meu nome é ${nome}
=================================
🕒 Tempo restante: ${tempoDeVida}
⚡ Energia: ${energia}/32
🧼 Higiene: ${higiene}/28
💰 Cresceleons: ${cresceleons}
💼 Aspiração: ${aspiracao}
🎯 Habilidades:`);

  for (const [habilidade, pontos] of Object.entries(pontosDeHabilidade)) {
    const senioridade = verificarSerionidade(pontos);
    console.log(`    ${habilidade}: ${pontos} pontos (${senioridade})`);
  }

  console.log("🎒 Itens:");
  if (itens.length) {
    itens.forEach(({ nome }) => console.log(`    ${nome}`));
  } else {
    console.log("    Nenhum item");
  }

  console.log("=================================\n");
}

export { exibirInfoPersonagem };