function comprarItem(id, nome, preco, pontos, categoria, personagem) {
  if (personagem.cresceleons < preco) {
    return {
      sucesso: false,
      mensagem: "💸 Ah não! Você não tem Cresceleons suficientes pra essa compra.",
    };
  }

  // Quando a compra for realizada
  personagem.cresceleons -= preco;
  personagem.itens.push({
    id,
    nome,
    preco,
    pontos,
    habilidade: categoria,
  });

  return {
    sucesso: true,
    nome,
    saldoRestante: personagem.cresceleons,
    personagemNovo: personagem,
  };
}

export { comprarItem };
