import axios from 'axios';
import { getPersonagemAtual, setPersonagemEmMemoria } from '../../../context/gerenciadorPersonagem';
import { useLocalStorage } from '../../../services/local-storage/use-local-storage';
import { atualizarPontosHabilidade, verificarERemoverEnergia, atualizarTipoRelacao } from './executarInteracoes';

const URL_INTERACOES = 'https://emilyspecht.github.io/the-cresim/interacoes.json';

// Busca detalhes da interação pelo tipo e nome da interação
async function obterDetalhesInteracao(tipo, interacao) {
  try {
    const { data: interacoes } = await axios.get(URL_INTERACOES);

    if (!interacoes[tipo]) {
      return { erro: `Tipo "${tipo}" não existe.` };
    }

    const item = interacoes[tipo].find(i => i.interacao === interacao);
    if (!item) {
      return { erro: `Interação "${interacao}" não encontrada em "${tipo}".` };
    }

    return item;
  } catch {
    return { erro: 'Falha ao buscar interações no servidor.' };
  }
}

// Salva os personagens atualizados no localStorage e atualiza o personagem atual do contexto
function atualizarBancoDeDados(personagemAtual, personagemSelecionado) {
  const storage = useLocalStorage();
  const lista = storage.getObject('listaPersonagens') || [];

  const listaAtualizada = lista.map(p => {
    if (p.id === personagemAtual.id) return personagemAtual;
    if (p.id === personagemSelecionado.id) return personagemSelecionado;
    return p;
  });

  storage.setObject('listaPersonagens', listaAtualizada);
  setPersonagemEmMemoria(personagemAtual);
}

// Ajusta o tempo de jogo dos dois personagens baseado na energia gasta
function atualizarTempoDeJogo(personagemAtual, personagemSelecionado, energiaAtual, energiaSelecionado) {
  const tempoAtual = energiaAtual * 2000;
  const tempoSelecionado = energiaSelecionado * 2000;

  personagemAtual.tempoDeJogo -= tempoAtual;
  personagemSelecionado.tempoDeJogo -= tempoSelecionado;
}

// Função principal que executa a interação entre personagens
async function executarInteracao(tipo, interacao, personagemSelecionado) {
  const detalhes = await obterDetalhesInteracao(tipo, interacao);
  if (detalhes.erro) return detalhes;

  const personagemAtual = getPersonagemAtual();
  if (!personagemAtual) return { erro: 'Nenhum personagem ativo.' };

  const energiaNecessaria = detalhes.energia;
  const pontos = detalhes.pontos;

  // Verifica se os personagens têm energia suficiente e remove a energia gasta
  const energiaValidada = verificarERemoverEnergia(personagemAtual, personagemSelecionado, energiaNecessaria);
  if (energiaValidada.erro) return energiaValidada;

  atualizarTempoDeJogo(personagemAtual, personagemSelecionado, energiaValidada.energiaGastaAtual, energiaValidada.energiaGastaSelecionado);
  atualizarPontosHabilidade(personagemAtual, personagemSelecionado, pontos);
  atualizarTipoRelacao(personagemAtual, personagemSelecionado);
  atualizarBancoDeDados(personagemAtual, personagemSelecionado);

  return {
    sucesso: true,
    interacao,
    tipo,
    energiaGastaAtual: energiaValidada.energiaGastaAtual,
    energiaGastaSelecionado: energiaValidada.energiaGastaSelecionado,
    pontosGanhos: pontos,
    personagemAtual,
    personagemSelecionado
  };
}

export { executarInteracao };