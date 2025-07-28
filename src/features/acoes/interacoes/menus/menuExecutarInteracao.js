// Menu de interação entre personagens - por Gabriel
import { useQuestion } from "../../../../services/question/use-question";

// Pergunta qual personagem o jogador deseja interagir
async function perguntarEscolhaPersonagem() {
  return await useQuestion("\n👥 Com qual personagem você quer interagir? ");
}

// Pergunta qual ação o jogador deseja realizar na interação
async function perguntarOpcaoInteracao() {
  return await useQuestion("\n🤔 O que você deseja fazer? ");
}

// Pergunta o tipo de interação específica
async function perguntarTipoDeInteracao() {
  return await useQuestion("\n💬 Qual tipo de interação você deseja realizar? ");
}

export {
  perguntarEscolhaPersonagem,
  perguntarOpcaoInteracao,
  perguntarTipoDeInteracao,
};