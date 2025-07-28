//arquivo criado por Adrian
import { useLocalStorage } from "../services/local-storage/use-local-storage";

let personagemAtual;

function getPersonagemAtual() {
  return personagemAtual;
}

function setPersonagemEmMemoria(personagem) {
  personagemAtual = personagem;
}

function atualizarPersonagem(personagemAtualizado) {
  const storage = useLocalStorage();
  const personagens = storage.getObject("listaPersonagens") || [];

  const index = personagens.findIndex(p => p.id === personagemAtualizado.id);

  let novaLista;

  if (index === -1) {
    // Adiciona o personagem novo
    novaLista = [...personagens, personagemAtualizado];
  } else {
    // Atualiza o personagem existente
    const personagemMesclado = {
      ...personagens[index],
      ...personagemAtualizado,
    };
    novaLista = [...personagens];
    novaLista[index] = personagemMesclado;
  }

  storage.setObject("listaPersonagens", novaLista);
  setPersonagemEmMemoria(personagemAtualizado);
}

export {
  getPersonagemAtual,
  setPersonagemEmMemoria,
  atualizarPersonagem,
};