// exibirResultado-menu.js
import { voltarAoMenuAcoes } from "../../menuAcao.js";
import { useQuestion } from "../../../../services/question/use-question.js";

async function exibirResumoInteracao(resultado) {
  if (resultado.erro) {
    console.log("Erro:", resultado.erro);
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

  console.log("");
  console.log("========== Resumo da Interacao ==========");
  console.log("");

  console.log("Interacao:", interacao, "(", tipo, ")");

  console.log("");
  console.log("🔋 Energia Gasta:");
  console.log(" -", personagemAtual.nome, ": -", energiaGastaAtual, "(Restante:", personagemAtual.energia, ")");
  
  // Sempre exibir a energia do personagem selecionado
  if (energiaGastaSelecionado !== undefined && personagemSelecionado) {
    console.log(" -", personagemSelecionado.nome, ": -", energiaGastaSelecionado, "(Restante:", personagemSelecionado.energia, ")");
  }

  console.log("");
  console.log("💖 Pontos de Relacionamento:");
  console.log(" -", personagemAtual.nome, "ganhou", pontosGanhos, "ponto(s) com", personagemSelecionado.nome);
  console.log(" -", personagemSelecionado.nome, "ganhou", pontosGanhos, "ponto(s) com", personagemAtual.nome);

  console.log("");
  console.log("⭐ Novo Status de Relacionamento:");

  // Verifica se as propriedades de interação existem
  if (personagemAtual?.interacoes?.[personagemSelecionado?.nome]) {
    const tipoRelacao = personagemAtual.interacoes[personagemSelecionado.nome].tipo;
    console.log(" -", personagemAtual.nome, "agora e", tipoRelacao, "de", personagemSelecionado.nome);
  }
  
  if (personagemSelecionado?.interacoes?.[personagemAtual?.nome]) {
    const tipoRelacao = personagemSelecionado.interacoes[personagemAtual.nome].tipo;
    console.log(" -", personagemSelecionado.nome, "agora e", tipoRelacao, "de", personagemAtual.nome);
  }

  console.log("");
  console.log("============================================");
  console.log("");

  console.log("Pressione qualquer tecla para continuar...");
  await useQuestion("");
  voltarAoMenuAcoes();
}

export { exibirResumoInteracao };
