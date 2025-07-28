// exibirResultado-menu.js
import { voltarAoMenuAcoes } from "../../menuAcao";

function exibirResumoInteracao(resultado) {
  if (resultado.erro) {
    console.log(`❌ Ops! Algo deu errado: ${resultado.erro}`);
    return;
  }

  const {
    personagemAtual,
    personagemSelecionado,
    interacao,
    tipo,
    energiaGastaAtual,
    energiaGastaSelecionado,
    pontosGanhos,
  } = resultado;

  console.log("\n========== 🤝 Resumo da Interação ==========\n");

  console.log(`🎭 Interação: ${interacao} (${tipo})`);

  console.log(`\n🔋 Energia Gasta:`);
  console.log(` - ${personagemAtual.nome}: -${energiaGastaAtual} (Restante: ${personagemAtual.energia})`);
  console.log(` - ${personagemSelecionado.nome}: -${energiaGastaSelecionado} (Restante: ${personagemSelecionado.energia})`);

  console.log(`\n💖 Pontos de Relacionamento:`);
  console.log(` - ${personagemAtual.nome} ganhou ${pontosGanhos} ponto(s) com ${personagemSelecionado.nome}`);
  console.log(` - ${personagemSelecionado.nome} ganhou ${pontosGanhos} ponto(s) com ${personagemAtual.nome}`);

  console.log(`\n🔗 Novo Status de Relacionamento:`);
  console.log(` - ${personagemAtual.nome} agora é **${personagemAtual.interacoes[personagemSelecionado.nome].tipo}** de ${personagemSelecionado.nome}`);
  console.log(` - ${personagemSelecionado.nome} agora é **${personagemSelecionado.interacoes[personagemAtual.nome].tipo}** de ${personagemAtual.nome}`);

  console.log("\n============================================\n");

  setTimeout(() => {
    console.log("⏳ Retornando ao menu de ações...");
    voltarAoMenuAcoes(personagemAtual);
  }, 30000); // Espera 30 segundos
}

export { exibirResumoInteracao };
