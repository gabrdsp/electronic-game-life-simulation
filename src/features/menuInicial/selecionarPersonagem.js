//Arquivo criado por Adrian

import { useQuestion } from "../../services/question/use-question";
import { atualizarPersonagem } from "../../context/gerenciadorPersonagem";
import { voltarAoMenuPrincipal } from "../../../index";
import { menuAcaoPersonagem } from "../acoes/menuAcao";
import { mostrarLoading } from "../../utils/menuLoading";


// Função que apresenta as opções referentes á seleção de personagens
async function selecionarPersonagem(listaDePersonagem) {
  let encontrouPersonagem = false;
  let resposta;
  const lista = Array.isArray(listaDePersonagem) ? [...listaDePersonagem] : [];

  console.log(`\n--------------- Seleção de Personagens ---------------\n`);

  if (lista.length > 0) {
    lista.forEach((personagem, index) => {
      if (personagem.tempoDeVida > 0) {
        console.log(
          `\n${index + 1}. - Nome: ${personagem.nome}, Aspiração: ${personagem.aspiracao}, Trabalho: ${personagem.trabalho} Cresceleons: ${personagem.cresceleons}`
        );
        encontrouPersonagem = true;
      }
    });
  }

  if (!encontrouPersonagem || lista.length === 0) {
    resposta = await useQuestion('\n  Voltar ao menu inicial? Digite "x": ');

    if (resposta === "x") {
      voltarAoMenuPrincipal(resposta);
    } else {
      await redirecionando();
      console.clear();
      await selecionarPersonagem(lista);
    }
    return;
  }

  resposta = await useQuestion(
    '\nDigite um número para selecionar um personagem (ou "x" para voltar ao menu inicial): '
  );

  if (resposta === "x") {
    voltarAoMenuPrincipal(resposta);
    return;
  }

  const indexSelecionado = parseInt(resposta, 10);

  if (isNaN(indexSelecionado) || indexSelecionado < 1 || indexSelecionado > lista.length) {
    await redirecionando();
    console.clear();
    await selecionarPersonagem(lista);
    return;
  }
  
  atualizarPersonagem(lista[indexSelecionado - 1]);
  await mostrarLoading();
  console.clear();
  menuAcaoPersonagem();
}

export { selecionarPersonagem };
