import { useLocalStorage } from '../../../services//local-storage/use-local-storage';
import { getPersonagemAtual } from '../../../context//gerenciadorPersonagem';

// Busca todos os personagens salvos no localStorage
function obterPersonagensDoDB() {
  const storage = useLocalStorage();
  return storage.getObject('listaPersonagens') || [];
}

// Filtra os personagens disponíveis, ignorando o personagem atual
function filtrarPersonagensDisponiveis(lista) {
  const euMesmo = getPersonagemAtual();
  return lista.filter(p => p.nome !== euMesmo.nome);
}

export { obterPersonagensDoDB, filtrarPersonagensDisponiveis };