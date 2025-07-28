import axios from 'axios';

const INTERACOES_URL = 'https://emilyspecht.github.io/the-cresim/interacoes.json';

// Busca as interações no servidor
async function obterInteracoes() {
  try {
    const resposta = await axios.get(INTERACOES_URL);
    return resposta.data;
  } catch (erro) {
    console.error("Não foi possível carregar as interações:", erro);
    return null;
  }
}

// Retorna os tipos de interação disponíveis com base nos pontos
function obterTiposDeInteracaoDisponiveis(pontos, interacoes) {
  const tipos = [];

  if (pontos < 0) {
    tipos.push("NEUTRO", "INIMIZADE");
  } else if (pontos <= 10) {
    tipos.push("NEUTRO");
  } else if (pontos <= 25) {
    tipos.push("AMIZADE", "NEUTRO");
  } else {
    tipos.push("AMOR", "AMIZADE", "NEUTRO");
  }

  return tipos.filter(tipo => interacoes[tipo]);
}

// Retorna o tipo de relação com base nos pontos
function determinarRelacao(pontos) {
  if (pontos < 0) return "INIMIZADE";
  if (pontos <= 10) return "NEUTRO";
  if (pontos <= 25) return "AMIZADE";
  return "AMOR";
}

// Garante que ambos os personagens tenham interações registradas
function inicializarRelacao(personagemA, personagemB) {
  personagemA.interacoes ??= {};
  personagemB.interacoes ??= {};

  if (!personagemA.interacoes[personagemB.nome]) {
    personagemA.interacoes[personagemB.nome] = { pontos: 0, tipo: "NEUTRO" };
  }
}

// Retorna a relação entre dois personagens, atualizando o tipo se necessário
function obterRelacaoEntrePersonagens(personagemA, personagemB) {
  inicializarRelacao(personagemA, personagemB);
  const relacao = personagemA.interacoes[personagemB.nome];
  relacao.tipo = determinarRelacao(relacao.pontos);
  return relacao;
}

export {
  obterInteracoes,
  obterTiposDeInteracaoDisponiveis,
  determinarRelacao,
  obterRelacaoEntrePersonagens,
};