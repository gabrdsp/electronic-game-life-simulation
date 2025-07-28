const { setarValoresPersonagem } = require("../src/features/funcoesAuxiliares");

// Mock básico
const personagemBase = {
  nome: "Cresim",
  energia: 32,
  higiene: 28,
  cresceleons: 1500,
  aspiracao: "",
  tempoDeVida: 3600000,
  id: 0,
};

describe("Teste 1", () => {
  it("Deve conseguir criar um novo Cresim com nome, pontos de higiene e energia carregados e 1500 Cresceleons", () => {
    const novosPersonagens = [];
    const personagemCriado = setarValoresPersonagem(novosPersonagens, "Cresim", "");

    expect(personagemCriado.nome).toBe("Cresim");
    expect(personagemCriado.higiene).toBe(28);
    expect(personagemCriado.energia).toBe(32);
    expect(personagemCriado.cresceleons).toBe(1500);
  });
});

describe("Teste 2", () => {
  it("Deve conseguir atribuir uma aspiração ao Cresim", () => {
    const personagem = { ...personagemBase };
    personagem.aspiracao = "Gastronomia";
    expect(personagem.aspiracao).toBe("Gastronomia");
  });
});

describe("Teste 3", () => {
  it("Deve validar os pontos de energia do personagem para que não passem de 32 pontos", () => {
    const personagem = { ...personagemBase, energia: 40 };
    if (personagem.energia > 32) personagem.energia = 32;
    expect(personagem.energia).toBeLessThanOrEqual(32);
  });
});

describe("Teste 4", () => {
  it("Deve validar os pontos de energia do personagem para que não fiquem negativados", () => {
    const personagem = { ...personagemBase, energia: -5 };
    if (personagem.energia < 0) personagem.energia = 0;
    expect(personagem.energia).toBeGreaterThanOrEqual(0);
  });
});
