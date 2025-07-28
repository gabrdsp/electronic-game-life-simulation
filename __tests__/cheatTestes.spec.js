const { atualizarPersonagem, getPersonagemAtual } = require("../src/context/gerenciadorPersonagem");
const { verificarCheat } = require("../src/features/gerenciadorCheats");


const personagemBase = {
  nome: "Cresim",
  energia: 22,
  higiene: 14,
  cresceleons: 1500,
  aspiracao: "",
  tempoDeVida: 3500000,
  id: 0,
  interacoes: {
    Leandro: {
        pontos: 5,
        tipo: "NEUTRO"
    }}
};

describe("teste SORTENAVIDA", () => {
    it("Deve conseguir aplicar o cheat SORTENAVIDA e receber as recompensas", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("SORTENAVIDA")

        const personagem = getPersonagemAtual()

        expect(personagem.cresceleons).toBe(2500)
    })
})

describe("teste DEITADONAREDE", () => {
    it("Deve conseguir aplicar o cheat DEITADONAREDE e receber as recompensas", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("DEITADONAREDE")

        const personagem = getPersonagemAtual();

        expect(personagem.energia).toBe(32);
    })
})

describe("teste TERAPIA", () => {
    it("Deve conseguir aplicar o cheat TERAPIA e receber as recompensas", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("TERAPIA")

        const personagem = getPersonagemAtual();

        expect(personagem.interacoes.Leandro.pontos).toBe(10);
    })
})

describe("teste DESODORANTE", () => {
    it("Deve conseguir aplicar o cheat DESODORANTE e receber as recompensas", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("DESODORANTE")

        const personagem = getPersonagemAtual();

        expect(personagem.higiene).toBe(28);
    })
})

describe("teste WHEYPROTEIN", () => {
    it("Deve conseguir aplicar o cheat WHEYPROTEIN e receber as recompensas", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("WHEYPROTEIN")

        const personagem = getPersonagemAtual();

        expect(personagem.tempoDeVida).toBe(3600000);
    })
})

describe("teste SINUSITE", () => {
    it("Deve conseguir aplicar o cheat SINUSITE e ter a vida zerada", () =>{
        atualizarPersonagem(personagemBase);

        verificarCheat("SINUSITE")

        const personagem = getPersonagemAtual();

        expect(personagem.tempoDeVida).toBe(0);
    })
})