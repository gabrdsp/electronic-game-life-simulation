import {
  obterPersonagensDoDB,
  filtrarPersonagensDisponiveis,
} from "./interacoesPersonagens.js";

import {
  listarPersonagensInteracao,
  exibirMensagemSemPersonagens,
  exibirMensagemPersonagemEscolhido,
  exibirMensagemOpcaoInvalida,
  exibirMenuInteracoes,
  exibirErroInteracoes,
  exibirOpcaoInvalida,
  exibirMenuTiposDeInteracao,
} from "./menus/menuMensagensInteracao.js";

import {
  perguntarEscolhaPersonagem,
  perguntarOpcaoInteracao,
  perguntarTipoDeInteracao,
} from "./menus/menuExecutarInteracao.js";

import { voltarAoMenuAcoes } from "../../acoes/menuAcao.js";
import { mostrarLoading } from "../../../utils/menuLoading.js";
import { setPersonagemEmMemoria } from "../../../context/gerenciadorPersonagem.js";
import { exibirResumoInteracao } from "./menus/Resultado.js";
import { executarInteracao } from "./funcoesInteracoes.js";

import {
  obterInteracoes,
  obterTiposDeInteracaoDisponiveis,
  obterRelacaoEntrePersonagens,
} from "./menuInteracoes.js";
import { verificarCheat } from "../../gerenciadorCheats.js";

// Inicia o menu de escolha de personagens para interação
async function executarListagemPersonagens() {
  const personagens = obterPersonagensDoDB();

  if (!personagens || personagens.length === 0) {
    exibirMensagemSemPersonagens();
    return;
  }

  const disponiveis = filtrarPersonagensDisponiveis(personagens);

  if (disponiveis.length === 0) {
    console.log("\nNenhum personagem disponível para interagir.");
    setTimeout(voltarAoMenuAcoes, 3000);
    return;
  }

  while (true) {
    listarPersonagensInteracao(disponiveis);
    const escolha = await perguntarEscolhaPersonagem();

    await verificarCheat(escolha);

    if (escolha.toUpperCase() === "X") {
      console.log("\nVoltando ao menu anterior...\n");
      await mostrarLoading();
      return voltarAoMenuAcoes();
    }

    const index = parseInt(escolha) - 1;
    const personagemEscolhido = disponiveis[index];

    if (!isNaN(index) && personagemEscolhido) {
      exibirMensagemPersonagemEscolhido(personagemEscolhido.nome);
      await menuTiposDeInteracao(personagemEscolhido);  // Aguardamos antes de voltar
      return voltarAoMenuAcoes();                        // Depois voltamos ao menu de ações
    } else {
      exibirMensagemOpcaoInvalida();
    }


  }
}

// Mostra as interações disponíveis para o tipo selecionado
async function menuInteracoes(personagemEscolhido, tipoSelecionado) {
  const interacoes = await obterInteracoes();

  if (!interacoes) {
    exibirErroInteracoes();
    return;
  }

  const opcoes = interacoes[tipoSelecionado] || [];

  if (opcoes.length === 0) {
    console.clear();
    await mostrarLoading();
    await menuTiposDeInteracao(personagemEscolhido);  // Espera antes de continuar
    return;
  }

  while (true) {
    exibirMenuInteracoes(tipoSelecionado, opcoes);
    const escolha = await perguntarOpcaoInteracao();

    if (escolha.toUpperCase() === "X") {
      console.clear();
      console.log("\nVoltando ao menu de interações...\n");
      await menuTiposDeInteracao(personagemEscolhido);
      return;
    }

    const index = parseInt(escolha) - 1;

    if (!isNaN(index) && opcoes[index]) {
      const interacaoEscolhida = opcoes[index].interacao;
      const resultado = await executarInteracao(
        tipoSelecionado,
        interacaoEscolhida,
        personagemEscolhido
      );

      if (resultado?.sucesso) {
        console.clear();
        await mostrarLoading();
        exibirResumoInteracao(resultado);
        return;
      }
    } else {
      exibirOpcaoInvalida();
    }
  }
}

// Mostra os tipos de interação possíveis com base na relação
async function menuTiposDeInteracao(personagemEscolhido) {
  const personagemAtual = setPersonagemEmMemoria();

  if (!personagemAtual) {
    exibirErroInteracoes();
    return;
  }

  const interacoes = await obterInteracoes();

  if (!interacoes) {
    exibirErroInteracoes();
    return;
  }

  const relacao = obterRelacaoEntrePersonagens(personagemAtual, personagemEscolhido);
  const tiposDisponiveis = obterTiposDeInteracaoDisponiveis(relacao.pontos, interacoes);

  while (true) {
    exibirMenuTiposDeInteracao(personagemEscolhido, relacao, tiposDisponiveis);
    const escolha = await perguntarTipoDeInteracao();

    if (escolha.toUpperCase() === "X") {
      console.clear();
      console.log("\nVoltando ao menu anterior...\n");
      await mostrarLoading();
      await executarListagemPersonagens();  // Espera para continuar o fluxo correto
      return;
    }

    const index = parseInt(escolha) - 1;

    if (!isNaN(index) && tiposDisponiveis[index]) {
      console.clear();
      await mostrarLoading();
      await menuInteracoes(personagemEscolhido, tiposDisponiveis[index]);
      return;
    }
  }
}

export {
  executarListagemPersonagens,
  menuInteracoes,
  menuTiposDeInteracao,
};