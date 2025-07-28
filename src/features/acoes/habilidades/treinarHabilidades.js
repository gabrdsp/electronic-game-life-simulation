// Arquivo criado por Gabriel

import { treinoEnergiaGasta, regularEnergia } from "../../../utils/controleEnergia";
import { atualizarPersonagem } from "../../../context/gerenciadorPersonagem"; 
import { useQuestion } from "../../../services/question/use-question"; 
import { redirecionando } from "../../../utils/menuLoading"; 
import { exibirInfoPersonagem } from "../../infoPersonagens"; 
import { voltarAoMenuAcoes } from "../../acoes/menuAcao"; 

const tempoTreino = 8000; // Duração do ciclo de treino (8 segundos)
const intervalo = 350; // Intervalo da animação
const energiaNecessaria = 4; // Energia mínima para treinar

// Função que normaliza texto (remove acentos e deixa minúsculo)
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Função principal que exibe o menu de treino
async function menuTreinar(personagem) {
  exibirInfoPersonagem();

  const itens = personagem.itens;

  if (!itens.length) {
    console.log("❌ Você não tem itens disponíveis para treinar.");
    return aguardarVoltar(() => menuTreinar(personagem));
  }

  if (personagem.energia < energiaNecessaria) {
    console.log("⚡ Você não tem energia suficiente para treinar.");
    return aguardarVoltar(() => menuTreinar(personagem));
  }

  exibirItensParaTreino(itens);

  const escolha = await useQuestion("Escolha o item que deseja treinar: ");

  if (escolha.toLowerCase() === "x") return voltarAoMenuAcoes();

  const index = parseInt(escolha) - 1;
  const itemSelecionado = itens[index];

  if (!itemSelecionado) {
    await redirecionando();
    return menuTreinar(personagem);
  }

  // Executa o treino com animação
  const personagemAtualizado = await animacaoTreino(itemSelecionado, personagem);

  atualizarPersonagem(personagemAtualizado); 

  // Exibe o status atualizado para o usuário
  exibirInfoPersonagem();

  // Volta para o menu de ações
  voltarAoMenuAcoes();
}

// Exibe os itens disponíveis para treino
function exibirItensParaTreino(itens) {
  console.log("\n======= Seus Itens de Treino =======\n");
  itens.forEach((item, i) => {
    console.log(`${i + 1} - Nome: ${item.nome} | +${item.pontos} pontos | Habilidade: ${item.habilidade}`);
  });
  console.log("\nX - Voltar\n");
}

// Aguarda o usuário pressionar X para voltar
async function aguardarVoltar(callback) {
  const resposta = await useQuestion("X - Voltar\n");
  if (resposta.toLowerCase() === "x") return voltarAoMenuAcoes();

  await redirecionando();
  await callback();
}

// Animação visual + aplica os efeitos do treino
function animacaoTreino(item, personagem) {
  function mostrarLoading() {
    let contador = 1;

    const loading = setInterval(() => {
      console.clear();
      switch (contador) {
        case 1: console.log("   ⭐  "); break;
        case 2: console.log("   🌟  "); break;
        case 3: console.log("✨ CR ✨"); break;
        case 4: console.log(" ✨ CRES ✨"); break;
        case 5: console.log("  ✨ CRESCER ✨"); break;
        case 6: console.log("        🌟  "); break;
        case 7: console.log("        ⭐  "); contador = 0; break;
      }
      contador++;
    }, intervalo);

    return loading;
  }

  return new Promise((resolve) => {
    const animacao = mostrarLoading();

    setTimeout(() => {
      clearInterval(animacao);
      const atualizado = treinarHabilidadeInterna(item, personagem);
      resolve(atualizado);
    }, tempoTreino);
  });
}

// Lógica do treino (aplica pontos e desconta energia)
function treinarHabilidadeInterna(item, personagem) {
  const { habilidade, pontos } = item;

  const pontosAtuais = personagem.pontosDeHabilidade?.[habilidade] || 0;
  const bonus = normalizarTexto(personagem.aspiracao) === normalizarTexto(habilidade) ? 1 : 0;
  const novosPontos = pontosAtuais + pontos + bonus;

  personagem.pontosDeHabilidade = {
    ...personagem.pontosDeHabilidade,
    [habilidade]: novosPontos,
  };

  // Deduz energia e atualiza limites
  treinoEnergiaGasta(1); // desconta 4 de energia e 8000 ms de tempo de vida
  regularEnergia();

  console.log(`\n✅ ${personagem.nome} treinou ${habilidade}!`);
  console.log(`🎯 Ganhou ${pontos + bonus} pontos (${pontos} + ${bonus} bônus por aspiração)`);
  console.log(`⚡ Energia restante: ${personagem.energia}`);

  return personagem;
}

export { menuTreinar };