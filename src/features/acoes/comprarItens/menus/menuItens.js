function exibirItens(itens, categoria, saldoAtual) {
  console.log("✨================== ITENS ==================✨");
  console.log(`\n🧾 Categoria: ${categoria}`);
  console.log(` Seu saldo: R$${saldoAtual}\n`);

  itens.forEach((item) => {
    console.log(
      `🔹 [${item.id}] ${item.nome} | 🏆 ${item.pontos} pts | 💵 R$${item.preco}`
    );
  });

  console.log("\n[0] Voltar para o menu da loja");
  console.log("===============================================");
}

export { exibirItens };
