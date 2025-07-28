// Arquivo criado por Adrian

import { useQuestion } from "../../services/question/use-question"
import { setarValoresPersonagem } from "../../features/funçoesAuxiliares";
import {voltarAoMenuAcoes } from "../acoes/menuAcao";
import { atualizarPersonagem, setPersonagemEmMemoria } from "../../context/gerenciadorPersonagem";

const personagens = [];

// Função que mostra o menu para escolha do nome e retorna esse mesmo nome :

async function perguntarNome(){
    console.clear();
    console.log("Conte mais sobre você 😄")
    const nome = await useQuestion("\nQual o seu nome?\n");

    return nome;
}

// Parte desenvolvida por Gabriel :
// Função que permite o jogador escolher uma aspiração :

async function escolherAspiracao() {
    console.log("\nEscolha uma aspiração para o seu Cresim :");
    console.log("1 - Gastronomia 🍉");
    console.log("2 - Pintura 🎨");
    console.log("3 - Jogos 🎮");
    console.log("4 - Jardinagem 🪴");
    console.log("5 - Música 🎸");

    const escolha = await useQuestion("Digite o número da aspiração desejada: ");
    const opcoes = {
        "1": "Gastronomia",
        "2": "Pintura",
        "3": "Jogos",
        "4": "Jardinagem",
        "5": "Música"
    };

    return opcoes[escolha] || "Sem aspiração"
}

async function escolherTrabalho(){
    console.log("\nEscolha um trabalo para o seu Cresim :");
    console.log("1 - Jogador de Dota 👾");
    console.log("2 - Assistente do Jacquin 🧑‍🍳");
    console.log("3 - Segurador de pincéis 🖌️");
    console.log("4 - Desafinador 🎤");
    console.log("5 - Ladrão de planta 🥷");

    const escolha = await useQuestion("Digite o número do cargo desejado: ")

    const opcoes = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5
    };
    return opcoes[escolha] || null
}

async function criarPersonagem() {
    const nome = await perguntarNome();
    const aspiracao = await escolherAspiracao();
    const trabalho = await escolherTrabalho();

    const personagem = setarValoresPersonagem(personagens, nome, aspiracao, trabalho);
    // console.log(personagem);

    atualizarPersonagem(personagem);
    personagens.push(personagem);

    console.log(`\nUm novo habitante foi adicionado ao Cresims. Seja bem-vindo, ${personagem.nome} 😄`);
    console.log(`Aspiração escolhida: ${personagem.aspiracao}`);
    console.log(`Cresceleons iniciais: ${personagem.cresceleons}`);

    voltarAoMenuAcoes();
}

export { criarPersonagem }