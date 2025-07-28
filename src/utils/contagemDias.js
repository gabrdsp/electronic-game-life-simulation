import { getPersonagemAtual } from "../context/personagem-menu"; 

//Função para calcular os dias Jogados
function calcularDiasDeJogo() {
  const personagem = getPersonagemAtual();

  if (!personagem) {
    console.warn("⚠️ Nenhum personagem encontrado.");
    return null;
  }

  const minutosJogados = personagem.tempoDeJogo / 60000;
  return Math.floor(minutosJogados);
}

export { calcularDiasDeJogo };
