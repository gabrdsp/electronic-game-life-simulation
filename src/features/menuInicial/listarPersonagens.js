// Arquivo criado por Adrian
import { voltarAoMenuPrincipal } from "../../../index";
import { useQuestion } from "../../services/question/use-question";

//Função que faz a listagem de personagens
async function listarPersonagens(listaDePersonagens) {
  console.log(`\n--------------- Lista de Personagens ---------------\n`);
  console.log(`Quantidade de personagens: ${listaDePersonagens.length}`);

  listaDePersonagens.forEach((personagem, index) => {
    exibirPersonagem(personagem, index + 1);
  });

  const voltar = await useQuestion("\nX - Para voltar \n");
  voltarAoMenuPrincipal(voltar);
}

//Função para exibição dos personagens
function exibirPersonagem(personagem, numero) {
  const aspiracaoFormatada = formatarCapitalizado(personagem.aspiracao);
  const tempoFormatado = milisegundosParaTempo(personagem.tempoDeVida);

  console.log(`\nPersonagem ${numero}
    Nome: ${personagem.nome} \n
    Aspiração: ${aspiracaoFormatada} \n
    Tempo Restante: ${tempoFormatado} \n
    Energia: ${personagem.energia} \n
    Higiene: ${personagem.higiene} \n
    Cresceleons: ${personagem.cresceleons} \n
    Habilidades:`);

  mostrarHabilidades(personagem.pontosDeHabilidade);

  console.log(`    Itens:`);
  mostrarItens(personagem.itens);

  console.log(`    Interações:`);
  mostrarInteracoes(personagem.interacoes);

  console.log(`\n----------//----------`);
}

//Função para exibição das habilidades do personagem
function mostrarHabilidades(habilidades) {
  for (const nome in habilidades) {
    const nomeFormatado = formatarCapitalizado(nome);
    console.log(`       ${nomeFormatado}: ${habilidades[nome]}`);
  }
}

//Função para exibição dos itens do personagem
function mostrarItens(listaDeItens = []) {
  for (let i = 0; i < listaDeItens.length; i++) {
    console.log(`       ${listaDeItens[i].nome}`);
  }
}

//Função para exibição das interações do personagem
function mostrarInteracoes(interacoes) {
  for (const pessoa in interacoes) {
    const pessoaFormatada = formatarCapitalizado(pessoa);
    console.log(`       ${pessoaFormatada}: ${interacoes[pessoa]}`);
  }
}

//Função de conversão 
function milisegundosParaTempo(ms) {
  if (ms < 60000) {
    const segundos = ms / 1000;
    return `${(Math.round(segundos * 2) / 2).toFixed(1)} segundos`;
  }

  const minutos = ms / 60000;
  return `${(Math.round(minutos * 2) / 2).toFixed(1)} minutos`;
}

//Função para formatação de texto
function formatarCapitalizado(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export { listarPersonagens };
