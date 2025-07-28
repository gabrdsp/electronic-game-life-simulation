// Arquivo criado por Gabriel

// Constantes
const BONUS_CICLO = 2;
const PROGRESSIVO_DEPOIS_CICLO_UM = 1;
const ENERGIA_MAXIMA = 32;
const ENERGIA_CICLO = 4;
const TEMPO_GASTO_CICLO = 5000;
const EXAUSTO = 0;
const HIGIENE_GASTA = 2;
const TEMPO_DE_TREINO = 8000;
const ENERGIA_CONSUMIDA = 4;
const PORCENTO = 100;
const MORTO = 0;
const TEMPO_MAXIMO = 3600000;
const CUSTO_BANHO = 10;
const VALOR_MAXIMO_HIGIENE = 28;
const DURACAO_BANHO = 3000;

const tipoNivelHabilidade = ["JUNIOR", "PLENO", "SENIOR"];

// Funções principais

function atualizarDormirPersonagem(personagem, energia, tempoDeJogo) {
  const novoPersonagem = { ...personagem };

  const energiaFinal = Math.min(energia, ENERGIA_MAXIMA - novoPersonagem.energia);
  novoPersonagem.energia += energiaFinal;
  novoPersonagem.tempoDeJogo -= tempoDeJogo;

  return novoPersonagem;
}

function calcularEnergiaTempo(escolha) {
  const ciclos = parseInt(escolha);
  const energiaGanha = ciclos * ENERGIA_CICLO + (ciclos - PROGRESSIVO_DEPOIS_CICLO_UM) * BONUS_CICLO;
  const tempoGasto = ciclos * TEMPO_GASTO_CICLO;

  return { energiaGanha, tempoGasto };
}

function zeradorDeEnergia(personagem) {
  if (personagem.energia < EXAUSTO) {
    personagem.energia = EXAUSTO;
  }
  return personagem;
}

function treinarHabilidade(item, personagem) {
  const { pontos, habilidade } = item;
  const bonus = habilidade === personagem.aspiracao ? 1 : 0;

  const personagemNovo = {
    ...personagem,
    pontosDeHabilidade: { ...personagem.pontosDeHabilidade },
    energia: personagem.energia - ENERGIA_CONSUMIDA,
    higiene: personagem.higiene - HIGIENE_GASTA,
    tempoDeJogo: personagem.tempoDeJogo - TEMPO_DE_TREINO
  };

  if (personagemNovo.pontosDeHabilidade[habilidade]) {
    personagemNovo.pontosDeHabilidade[habilidade] += pontos + bonus;
  } else {
    personagemNovo.pontosDeHabilidade[habilidade] = pontos + bonus;
  }

  return personagemNovo;
}

function verificarSerionidade(pontos) {
  if (pontos <= 16) return tipoNivelHabilidade[0]; // JUNIOR
  if (pontos <= 26) return tipoNivelHabilidade[1]; // PLENO
  return tipoNivelHabilidade[2];                   // SENIOR
}

function executarCheat(cheat, personagem, habilidade) {
  const personagemNovo = {
    ...personagem,
    pontosDeHabilidade: { ...personagem.pontosDeHabilidade }
  };

  switch (cheat.categoria) {
    case "SALARIO":
      personagemNovo.cresceleons += personagemNovo.cresceleons * (cheat.valor / PORCENTO);
      break;

    case "ENERGIA":
      personagemNovo.energia = Math.min(personagemNovo.energia + cheat.valor, ENERGIA_MAXIMA);
      break;

    case "HABILIDADE":
      if (personagemNovo.pontosDeHabilidade[habilidade]) {
        personagemNovo.pontosDeHabilidade[habilidade] += cheat.valor;
      } else {
        personagemNovo.pontosDeHabilidade[habilidade] = cheat.valor;
      }
      break;

    case "VIDA":
      if (cheat.valor === MORTO) {
        personagemNovo.tempoDeJogo = MORTO;
      } else {
        personagemNovo.tempoDeJogo = Math.min(personagemNovo.tempoDeJogo + cheat.valor, TEMPO_MAXIMO);
      }
      break;
  }

  return personagemNovo;
}

function tomarBanho(personagem) {
  return {
    ...personagem,
    cresceleons: personagem.cresceleons - CUSTO_BANHO,
    higiene: VALOR_MAXIMO_HIGIENE,
    tempoDeJogo: personagem.tempoDeJogo - DURACAO_BANHO
  };
}

export {
  atualizarDormirPersonagem,
  calcularEnergiaTempo,
  zeradorDeEnergia,
  treinarHabilidade,
  tipoNivelHabilidade,
  verificarSerionidade,
  executarCheat,
  tomarBanho
};
