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
  if (
    typeof personagemAtualizado !== "object" ||
    personagemAtualizado === null ||
    !("id" in personagemAtualizado)
  ) {
    console.error("❌ Personagem inválido para atualização (não é um objeto):", personagemAtualizado);
    console.trace("Trace:");
    return;
  }

  const storage = useLocalStorage();
  const personagens = storage.getObject("listaPersonagens") || [];

  const index = personagens.findIndex(p => p.id === personagemAtualizado.id);

  let novaLista;

  if (index === -1) {
    novaLista = [...personagens, personagemAtualizado];
  } else {
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