//Arquivo criado por Adrian

import { useQuestion } from "../../services/question/use-question";
import { voltarAoMenuPrincipal } from "../../../index";
import { deletarPersonagem } from "../funçoesAuxiliares";

// Função que apresenta as opções referentes á remoção de personagens
async function menuDeletar(listaPersonagens, storage) {
  console.log(`\n--------------- Lista de Personagens ---------------\n`);

  listaPersonagens.forEach((personagem, index) => {
    console.log(`${index + 1} - ${personagem.nome}`);
  });

  console.log("\nX - Voltar ao Menu Inicial");

  const resposta = await useQuestion(`\nEscolha o personagem a ser deletado:`);

  const indiceEscolhido = Number(resposta) - 1;

  const respostaEhInvalida =
    (isNaN(indiceEscolhido) && resposta.toLowerCase() !== "x") ||
    indiceEscolhido < 0 ||
    indiceEscolhido >= listaPersonagens.length;

  if (respostaEhInvalida) {
    return menuDeletar(listaPersonagens, storage);
  }

  if (resposta.toLowerCase() === "x") {
    return voltarAoMenuPrincipal();
  }

  const nomeExcluido = obterPersonagemPorIndice(listaPersonagens, indiceEscolhido)?.nome;

  const personagensAtualizados = deletarPersonagem(indiceEscolhido + 1, listaPersonagens);

  console.log(`\nPersonagem ${nomeExcluido} removido com sucesso.`);

  storage.setObject("listaPersonagens", personagensAtualizados);

  return deletarOuVoltar(personagensAtualizados, storage);
}


//Função que dá ao usuário a opção de deletar outro personagem ou retornar ao menu inicial
async function deletarOuVoltar(listaPersonagens, storage) {
  const resposta = await useQuestion(
    `\n1 - Excluir mais um personagem \nX - Voltar ao Menu Inicial`
  );

  switch (resposta.toLowerCase()) {
    case "1":
      return menuDeletar(listaPersonagens, storage);

    case "x":
      return voltarAoMenuPrincipal();

    default:
      return deletarOuVoltar(listaPersonagens, storage);
  }
}

//Função auxiliar que retorna o personagem com base em um índice
function obterPersonagemPorIndice(lista, indice) {
  return lista[indice];
}

export { menuDeletar };
