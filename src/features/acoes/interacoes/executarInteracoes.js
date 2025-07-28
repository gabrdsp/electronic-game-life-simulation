// Arquivo responsável por gerenciar interações entre dois personagens

// Garante que ambos os personagens possuam dados de interação entre si
function inicializarInteracao(personagemA, personagemB) {
  personagemA.interacoes ??= {};
  personagemB.interacoes ??= {};

  personagemA.interacoes[personagemB.nome] ??= { pontos: 0, tipo: "NEUTRO" };
  personagemB.interacoes[personagemA.nome] ??= { pontos: 0, tipo: "NEUTRO" };
}

// Atualiza os pontos de relacionamento entre dois personagens
function atualizarPontosHabilidade(personagemA, personagemB, pontos) {
  inicializarInteracao(personagemA, personagemB);

  personagemA.interacoes[personagemB.nome].pontos += pontos;
  personagemB.interacoes[personagemA.nome].pontos += pontos;
}

// Verifica se há energia suficiente e remove a energia dos personagens envolvidos
function verificarERemoverEnergia(personagemA, personagemB, custo) {
  if (personagemA.energia < custo) {
    return {
      erro: `Energia insuficiente! Você tem ${personagemA.energia}, mas precisa de ${custo}.`
    };
  }

  const gastoA = custo;
  const gastoB = Math.ceil(custo / 2);

  personagemA.energia -= gastoA;
  personagemB.energia -= gastoB;

  return { sucesso: true, energiaGastaAtual: gastoA, energiaGastaSelecionado: gastoB };
}

// Define o tipo de relação com base na quantidade de pontos acumulados
function atualizarTipoRelacao(personagemA, personagemB) {
  inicializarInteracao(personagemA, personagemB);

  const pontos = personagemA.interacoes[personagemB.nome].pontos;
  let tipo = "NEUTRO";

  if (pontos < 0) tipo = "INIMIZADE";
  else if (pontos >= 11 && pontos <= 25) tipo = "AMIZADE";
  else if (pontos > 25) tipo = "AMOR";

  personagemA.interacoes[personagemB.nome].tipo = tipo;
  personagemB.interacoes[personagemA.nome].tipo = tipo;
}

export {
  inicializarInteracao,
  atualizarPontosHabilidade,
  verificarERemoverEnergia,
  atualizarTipoRelacao
};