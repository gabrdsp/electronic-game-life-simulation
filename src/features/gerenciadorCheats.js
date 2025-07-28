//Arquivo criado por Adrian
import {
  voltarAoMenuAcoes,
} from "./acoes/menuAcao";
import { atualizarPersonagem, getPersonagemAtual } from "../context/gerenciadorPersonagem";
import { exibirInfoPersonagem } from "./infoPersonagens";

//Função que verifica se o input é um cheat e executa sua respectiva alteração
async function verificarCheat(input, callback = () => {}) {
  input = input.toUpperCase();
  let personagemNovo;
  const personagem = getPersonagemAtual();
  let cheatAtivado = false;

  const energiaMaxima = 32;
  const energiaCheat = 10;
  const energiaRecebida = verificarAtributo(personagem.energia, energiaMaxima, energiaCheat);

  const higieneMaxima = 28;
  const higieneCheat = 15;
  const higieneRecebida = verificarAtributo(personagem.higiene, higieneMaxima, higieneCheat);

  const vidaMaxima = 3600000;
  const vidaCheat = 100000;
  const vidaRecebida = verificarAtributo(personagem.tempoDeVida, vidaMaxima, vidaCheat);

  switch (input){
    case "SORTENAVIDA":
        personagemNovo = {
            ...personagem,
            cresceleons: personagem.cresceleons + 1000
        };
        cheatAtivado = true;
        break;

    case "DEITADONAREDE":
        personagemNovo = {
            ...personagem,
            energia: energiaRecebida
        };
        cheatAtivado = true;
        break;

    case "TERAPIA":
        if (personagem.interacoes) {
            const interacaoAtualizada = { ...personagem.interacoes };

            Object.keys(interacaoAtualizada).forEach((nome) => {
                interacaoAtualizada[nome].pontos += 5;
            });

            personagemNovo = {
                ...personagem,
                interacoes: interacaoAtualizada
            };
            

        cheatAtivado = true;
        }
        
        break;

    case "DESODORANTE":
        personagemNovo = {
            ...personagem,
            higiene: higieneRecebida
        };
        cheatAtivado = true;
        break;

    case "WHEYPROTEIN":
        personagemNovo = {
            ...personagem,
            tempoDeVida: vidaRecebida
        };
        cheatAtivado = true;
        break;

    case "SINUSITE":
        personagemNovo = {
            ...personagem,
            tempoDeVida: 0
        };
        cheatAtivado = true;
        break;
  }

  

  if(cheatAtivado){
    atualizarPersonagem(personagemNovo);
    console.log("Gosta de uma trapaça né? Cheat adicionado com sucesso! 😎\n");
    exibirInfoPersonagem();

    setTimeout(async () => {
    console.clear();   
    await callback();
  }, 4000)

  return;
  }

  await callback();
}

//Função que evita que os atributos ultrapassem o seu valor máximo
function verificarAtributo(atributo, atributoMaximo, adicionalCheat){
    atributo += adicionalCheat;

    if(atributo > atributoMaximo){
        atributo = atributoMaximo;
    }

    return atributo;
}

export { verificarCheat };