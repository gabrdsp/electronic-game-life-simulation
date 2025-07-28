const { atualizarPersonagem, getPersonagemAtual } =  require("../src/context/gerenciadorPersonagem");
const { tomarBanho } = require("../src/features/executarAcoes");
const { higieneTreino } = require("../src/utils/gerenciadorHigiene");

const personagemBase = {
  nome: "Cresim",
  energia: 32,
  higiene: 12,
  cresceleons: 1500,
  aspiracao: "",
  tempoDeVida: 3600000,
  id: 0,
};

describe("testes tomarBanho", () => {
    it("Deve descontar 10 Cresceleons ao tomar banho", () => {
        atualizarPersonagem(personagemBase);

        const personagemAtualizado = tomarBanho(getPersonagemAtual());

        expect(personagemAtualizado.cresceleons).toBe(1490);
    }) 
})

describe("teste higieneTreino", () => {
    it("Deve perder pontos de higiene ao terminar um ciclo de treino", () => {
        atualizarPersonagem(personagemBase);

        higieneTreino();

        const personagemAtual = getPersonagemAtual();

        expect(personagemAtual.higiene).toBe(10);
    })
})